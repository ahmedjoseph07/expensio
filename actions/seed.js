"use server";

import { db } from "@/lib/prisma";
import { subDays } from "date-fns";

const ACCOUNT_ID = "5aa55737-af80-43de-a0a2-cf32fe90689a";
const USER_ID = "0e806161-23ce-4dda-a9f2-fe194d187184";

// Updated Categories with their typical amount ranges
const CATEGORIES = {
    INCOME: [
        { name: "bonus", range: [3000, 7000] },
        { name: "part-time", range: [500, 2500] },
        { name: "rental-income", range: [1000, 3500] },
        { name: "stock-dividend", range: [200, 1200] },
    ],
    EXPENSE: [
        { name: "rent", range: [800, 1800] },
        { name: "fuel", range: [50, 300] },
        { name: "supermarket", range: [150, 500] },
        { name: "internet-bill", range: [50, 150] },
        { name: "movies", range: [20, 100] },
        { name: "restaurants", range: [30, 120] },
        { name: "clothing", range: [80, 400] },
        { name: "medical", range: [50, 800] },
        { name: "courses", range: [100, 600] },
        { name: "vacation", range: [300, 1500] },
    ],
};

// Helper to generate random amount within a range
function getRandomAmount(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Helper to get random category with amount
function getRandomCategory(type) {
    const categories = CATEGORIES[type];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amount = getRandomAmount(category.range[0], category.range[1]);
    return { category: category.name, amount };
}

export async function seedTransactions() {
    try {
        // Generate 90 days of transactions
        const transactions = [];
        let totalBalance = 0;

        for (let i = 90; i >= 0; i--) {
            const date = subDays(new Date(), i);

            // Generate 1-3 transactions per day
            const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

            for (let j = 0; j < transactionsPerDay; j++) {
                // 40% chance of income, 60% chance of expense
                const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
                const { category, amount } = getRandomCategory(type);

                const transaction = {
                    id: crypto.randomUUID(),
                    type,
                    amount,
                    description: `${
                        type === "INCOME" ? "Received" : "Paid for"
                    } ${category}`,
                    date,
                    category,
                    status: "COMPLETED",
                    userId: USER_ID,
                    accountId: ACCOUNT_ID,
                    createdAt: date,
                    updatedAt: date,
                };

                totalBalance += type === "INCOME" ? amount : -amount;
                transactions.push(transaction);
            }
        }

        // Insert transactions in batches and update account balance
        await db.$transaction(async (tx) => {
            // Clear existing transactions
            await tx.transaction.deleteMany({
                where: { accountId: ACCOUNT_ID },
            });

            // Insert new transactions
            await tx.transaction.createMany({
                data: transactions,
            });

            // Update account balance
            await tx.account.update({
                where: { id: ACCOUNT_ID },
                data: { balance: totalBalance },
            });
        });

        return {
            success: true,
            message: `Created ${transactions.length} transactions`,
        };
    } catch (error) {
        console.error("Error seeding transactions:", error);
        return { success: false, error: error.message };
    }
}
