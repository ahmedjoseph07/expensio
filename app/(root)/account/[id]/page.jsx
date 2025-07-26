import { getAccountWithTransactions } from "@/actions/account";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import TransactionTable from "../_components/TransactionTable";
import { PuffLoader } from "react-spinners";

const AccountPage = async ({ params }) => {
    const { id } = params;
    const accountData = await getAccountWithTransactions(id);
    console.log(id)

    if (!accountData) {
        notFound();
    }

    const { transactions, ...account } = accountData;

    console.log(accountData)
    return (
        <div className="p-6">
            {/* Account Details */}
            <div>
                <h1>{account.name}</h1>
                <p>
                    {account.type.charAt(0) +
                        account.type.slice(1).toLowerCase()}{" "}
                    Account
                </p>
            </div>

            {/* Transactions */}
            <div>
                <div>${parseFloat(account.balance).toFixed(2)}</div>
                <p>{account._count.transactions} Transactions</p>
            </div>

            {/* Chart Section*/}

            {/* Transaction Table */}
            <Suspense fallback={<PuffLoader className="mt-4" width="100%" />}>
                <TransactionTable transactions={transactions}/>
            </Suspense>
        </div>
    );
};

export default AccountPage;
