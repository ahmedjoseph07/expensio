import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowDownCircle, ArrowUpCircle, Banknote } from "lucide-react";
import Link from "next/link";
import React from "react";

const AccountCard = ({ account }) => {
    return (
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl p-2">
            <Link href={`/account/${account.id}`}>
                {/* Header */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                        <Banknote className="h-6 w-6 text-blue-600" />
                        <CardTitle className="text-lg font-semibold">
                            {account.name}
                        </CardTitle>
                    </div>
                    <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
                        <span className="text-sm text-muted-foreground">
                            Make Default
                        </span>
                        <Switch checked={account.isDefault}/>
                    </div>
                </CardHeader>

                {/* Content */}
                <CardContent>
                    <div className="text-2xl font-bold text-gray-800">
                        ${parseFloat(account.balance).toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground my-2">
                        {account.type.charAt(0) +
                            account.type.slice(1).toLowerCase()}{" "}
                        Account
                    </p>
                </CardContent>

                {/* Footer */}
                <CardFooter className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                        <ArrowUpCircle size={18} />
                        Income
                    </span>
                    <span className="flex items-center gap-1 text-red-600 font-medium">
                        <ArrowDownCircle size={18} />
                        Expense
                    </span>
                </CardFooter>
            </Link>
        </Card>
    );
};

export default AccountCard;
