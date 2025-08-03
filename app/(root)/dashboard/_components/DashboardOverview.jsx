"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";

export default function DashboardOverview({
    accounts = [],
    transactions = [],
}) {
    // Calculate totals
    const totalBalance = accounts.reduce(
        (sum, acc) => sum + Number(acc.balance),
        0
    );
    const totalIncome = transactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpenses = transactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + Number(t.amount), 0);


    // Recent transactions
    const recentTransactions = transactions.slice(0, 5);

    // Pie chart data
    const pieData = [
        { name: "Income", value: Number(totalIncome.toFixed(2)) },
        { name: "Expenses", value: Number(totalExpenses.toFixed(2))},
    ];
    const COLORS = ["#22c55e", "#ef4444"];

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Balance */}
            <Card className="shadow-md hover:shadow-lg cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Balance
                    </CardTitle>
                    <Wallet className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold break-words">
                        ${totalBalance.toFixed(2)}
                    </p>
                </CardContent>
            </Card>

            {/* Total Income */}
            <Card className="shadow-md hover:shadow-lg cursor-pointer sm:col-span-3 lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Income
                    </CardTitle>
                    <ArrowUpCircle className="h-5 w-5 text-green-500" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-green-600 break-words">
                        +${totalIncome.toFixed(2)}
                    </p>
                </CardContent>
            </Card>

            {/* Total Expenses */}
            <Card className="shadow-md hover:shadow-lg cursor-pointer sm:col-span-3 lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Expenses
                    </CardTitle>
                    <ArrowDownCircle className="h-5 w-5 text-red-500" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-red-600 break-words">
                        -${totalExpenses.toFixed(2)}
                    </p>
                </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="shadow-md hover:shadow-lg cursor-pointer sm:col-span-3 lg:col-span-2 ">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Income vs Expenses
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] sm:h-[300px] cursor-pointer">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                sm={{ outerRadius: 100 }}
                                fill="#8884d8"
                                dataKey="value"
                                label>
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="shadow-md hover:shadow-lg cursor-pointer sm:col-span-3 lg:col-span-1">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Recent Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {recentTransactions.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No transactions yet.
                        </p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {recentTransactions.map((tx) => (
                                <li
                                    key={tx.id}
                                    className="flex flex-wrap items-center justify-between py-2 gap-2">
                                    <span className="text-sm font-medium truncate max-w-[60%]">
                                        {tx.description || tx.category}
                                    </span>
                                    <span
                                        className={`text-sm font-semibold ${
                                            tx.type === "INCOME"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}>
                                        {tx.type === "INCOME" ? "+" : "-"}$
                                        {Number(tx.amount).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
