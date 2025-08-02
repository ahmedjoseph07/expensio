"use client";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import React, { useMemo, useState } from "react";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const RANGES = {
    "7D": { label: "Last 7 Days", days: 7 },
    "1M": { label: "Last Month", days: 30 },
    "3M": { label: "Last 3 Months", days: 90 },
    "6M": { label: "Last 6 Months", days: 180 },
    ALL: { label: "All Time", days: null },
};

const TransactionChart = ({ transactions }) => {
    const [dateRange, setDateRange] = useState("1M");

    const filteredData = useMemo(() => {
        const range = RANGES[dateRange];
        const now = new Date();
        const startDate = range.days
            ? startOfDay(subDays(now, range.days))
            : startOfDay(new Date(0));

        const filtered = transactions.filter(
            (t) =>
                new Date(t.date) >= startDate &&
                new Date(t.date) < endOfDay(now)
        );

        const grouped = filtered.reduce((acc, transaction) => {
            const date = format(new Date(transaction.date), "MMM dd");
            if (!acc[date]) {
                acc[date] = { date, income: 0, expense: 0 };
            }

            if (transaction.type === "INCOME") {
                acc[date].income += transaction.amount;
            } else {
                acc[date].expense += transaction.amount;
            }
            return acc;
        }, {});

        return Object.values(grouped)
            .map((item) => ({
                ...item,
                income: parseFloat(item.income.toFixed(2)),
                expense: parseFloat(item.expense.toFixed(2)),
            }))
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            );
    }, [transactions, dateRange]);

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Transaction Overview</CardTitle>
                <Select
                    value={dateRange}
                    onValueChange={(value) => setDateRange(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Range" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(RANGES).map(([key, { label }]) => (
                            <SelectItem key={key} value={key}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={filteredData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="income"
                            fill="#4ade80"
                            name="Income"
                            activeBar={
                                <Rectangle fill="green" stroke="black" />
                            }
                        />
                        <Bar
                            dataKey="expense"
                            fill="#f87171"
                            name="Expense"
                            activeBar={<Rectangle fill="red" stroke="black" />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default TransactionChart;
