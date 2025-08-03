"use server";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serialTransaction = (obj) => {
    const serialized = { ...obj };
    if (obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }
    if (obj.amount) {
        serialized.amount = obj.amount.toNumber();
    }

    return serialized;
};

export async function updateDefaultAccount(accountId) {
    try {
        // const { userId } = await auth();
        // if (!userId) {
        //     throw new Error("Unauthorized Access");
        // }
        // const user = await db.user.findUnique({
        //     where: { clerkUserId: userId },
        // });
        // if (!user) {
        //     throw new Error("User not found");
        // }
        const user = await getOrCreateUser();

        await db.account.updateMany({
            where: { userId: user.id, isDefault: true },
            data: { isDefault: false },
        });

        const account = await db.account.update({
            where: {
                id: accountId,
                userId: user.id,
            },
            data: { isDefault: true },
        });
        revalidatePath("/dashboard");
        return { success: true, data: serialTransaction(account) };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export async function getAccountWithTransactions(accountId) {
    try {
        // const { userId } = await auth();
        // if (!userId) {
        //     throw new Error("Unauthorized Access");
        // }
        // const user = await db.user.findUnique({
        //     where: { clerkUserId: userId },
        // });
        // if (!user) {
        //     throw new Error("User not found");
        // }

        const user = await getOrCreateUser();

        const account = await db.account.findUnique({
            where: { id: accountId, userId: user.id },
            include: {
                transactions: {
                    orderBy: { date: "desc" },
                },
                _count: {
                    select: { transactions: true },
                },
            },
        });

        if (!account) return null;
        return {
            ...serialTransaction(account),
            transactions: account.transactions.map(serialTransaction),
        };
    } catch (err) {
        console.error("getAccountWithTransactions Error:", err);
        return { success: false, error: err.message };
    }
}

export async function bulkDeleteTransactions(transactionIds) {
    try {
        // const { userId } = await auth();
        // if (!userId) throw new Error("Unauthorized Access");

        // const user = await db.user.findUnique({
        //     where: { clerkUserId: userId },
        // });
        // if (!user) throw new Error("User not found");

        const user = await getOrCreateUser();

        const transactions = await db.transaction.findMany({
            where: {
                id: { in: transactionIds },
                userId: user.id,
            },
        });

        if (!transactions.length) {
            throw new Error("No valid transactions found to delete.");
        }

        const accountBalanceChanges = transactions.reduce(
            (acc, transaction) => {
                const amount = +transaction.amount; // coerce to number
                const change =
                    transaction.type === "EXPENSE" ? amount : -amount;
                acc[transaction.accountId] =
                    (acc[transaction.accountId] || 0) + change;
                return acc;
            },
            {}
        );

        let deletedResult;
        await db.$transaction(async (t) => {
            deletedResult = await t.transaction.deleteMany({
                where: {
                    id: { in: transactionIds },
                    userId: user.id,
                },
            });

            for (const [accountId, balanceChange] of Object.entries(
                accountBalanceChanges
            )) {
                await t.account.update({
                    where: { id: accountId },
                    data: {
                        balance: { increment: balanceChange },
                    },
                });
            }
        });

        // Revalidate dashboard and affected accounts
        revalidatePath("/dashboard");
        Object.keys(accountBalanceChanges).forEach((accountId) =>
            revalidatePath(`/account/${accountId}`)
        );

        return {
            success: true,
            deletedCount: deletedResult?.count || 0,
        };
    } catch (err) {
        return {
            success: false,
            error: err.message,
        };
    }
}
