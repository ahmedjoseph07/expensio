import { getUserAccounts } from "@/actions/dashboard";
import CreateAccount from "@/components/CreateAccount";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import AccountCard from "./_components/AccountCard";
import { getCurrentBudget } from "@/actions/budget";
import BudgetProgress from "./_components/BudgetProgress";

const DashboardPage = async () => {
    const accounts = await getUserAccounts();
    const defaultAccount = accounts?.find((account) => account.isDefault);

    let budgetData = null;

    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }

    return (
        <div>
            {/* Progress */}
            {defaultAccount && (
                <BudgetProgress
                    initialBudget={budgetData?.budget}
                    currentExpenses={budgetData?.currentExpenses || 0 }
                />
            )}
            {/* Budget Overview */}

            {/* Accounts */}
            <div className="my-8">
                {/* Accounts Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Add Account Card */}
                    <CreateAccount>
                        <Card className="flex flex-col items-center justify-center border-dashed border-2 hover:border-blue-500 transition-colors duration-300 p-6 text-center cursor-pointer">
                            <CardContent className="flex flex-col items-center justify-center gap-2">
                                <Plus className="h-8 w-8 text-blue-500" />
                                <p className="text-blue-600 font-medium">
                                    Add Account
                                </p>
                            </CardContent>
                        </Card>
                    </CreateAccount>

                    {/* Account Cards */}
                    {accounts?.length > 0 &&
                        accounts.map((account) => (
                            <AccountCard key={account.id} account={account} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
