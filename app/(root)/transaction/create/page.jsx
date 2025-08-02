import { getUserAccounts } from "@/actions/dashboard";
import React from "react";
import AddTransactionForm from "../_components/TransactionForm";
import { Suspense } from "react";
import { FadeLoader } from "react-spinners";
import { getTransaction } from "@/actions/transaction";

const AddTransactionPage = async ({searchParams}) => {
    const accounts = await getUserAccounts();

    const editId = await searchParams?.edit;
    let initialData = null;
    if(editId){
        const transaction = await getTransaction(editId);
        initialData = transaction;
    }


    return (
        <div className="max-w-3xl border px-5 mx-4 md:mx-auto pt-1 rounded-xl">
            <h1 className="text-3xl md:text-5xl gradient my-4 md:my-10">
                Add Transaction
            </h1>
            <Suspense
                fallback={
                    <div className="flex justify-center py-8">
                        <FadeLoader />
                    </div>
                }>
                <AddTransactionForm accounts={accounts} initialData={initialData} editMode={!!editId}  />
            </Suspense>
        </div>
    );
};

export default AddTransactionPage;
