import { getAccountWithTransactions } from "@/actions/account";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import TransactionTable from "../_components/TransactionTable";
import { FadeLoader, PuffLoader } from "react-spinners";
import { Loader, Loader2 } from "lucide-react";
import TransactionChart from "../_components/TransactionChart";

const AccountPage = async ({ params }) => {
    const { id } = await params;
    const accountData = await getAccountWithTransactions(id);

    if (!accountData) {
        notFound();
    }

    const { transactions, ...account } = accountData;

    return (
        <div className="p-6 space-y-8">
            {/* Account Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {account.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {account.type.charAt(0) +
                            account.type.slice(1).toLowerCase()}{" "}
                        Account
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-semibold text-blue-600">
                        ${parseFloat(account.balance).toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-500">
                        {account._count.transactions} Transactions
                    </p>
                </div>
            </div>

            {/* Chart Section */}
            <Suspense
                fallback={
                    <div className="flex justify-center py-8">
                        <FadeLoader />
                    </div>
                }>
                <TransactionChart transactions={transactions} />
            </Suspense>

            {/* Transaction Table */}
            <div className="rounded-lg border p-4 bg-white shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Recent Transactions
                </h2>
                <Suspense
                    fallback={
                        <div className="flex justify-center py-8">
                            <FadeLoader />
                        </div>
                    }>
                    <TransactionTable transactions={transactions} />
                </Suspense>
            </div>
        </div>
    );
};

export default AccountPage;
