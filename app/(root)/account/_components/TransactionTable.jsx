"use client";
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, MoreHorizontalIcon, RefreshCcwDot } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
    const router = useRouter();
    const filteredTransactions = transactions || [];

    return (
        <div className="w-full overflow-x-auto rounded-md border bg-white shadow">
            <Table className="min-w-max">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox />
                        </TableHead>
                        <TableHead className="w-[50px]">
                            #
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={handleSort("date")}>
                            Date
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={handleSort("category")}>
                            Category
                        </TableHead>
                        <TableHead
                            className="cursor-pointer text-right"
                            onClick={handleSort("Amount")}>
                            Amount
                        </TableHead>
                        <TableHead>Recurring</TableHead>
                        <TableHead className="w-[50px] text-center">
                            Options
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTransactions.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="text-center text-muted-foreground py-6">
                                No Transactions Found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredTransactions.map((transaction,i) => (
                            <TableRow
                                key={transaction.id}
                                className="hover:bg-gray-50 transition-colors">
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>
                                    {i+1}
                                </TableCell>
                                <TableCell>
                                    {format(new Date(transaction.date), "PP")}
                                </TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell
                                    className={`text-right font-medium ${
                                        transaction.type === "INCOME"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}>
                                    {transaction.type === "INCOME" ? "+" : "-"}$
                                    {transaction.amount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    {transaction.isRecurring ? (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Badge
                                                    variant="outline"
                                                    className="flex items-center gap-1 px-2 py-1 cursor-pointer">
                                                    <RefreshCcwDot className="h-4 w-4" />
                                                    {
                                                        INTERVALS[
                                                            transaction
                                                                .recurringInterval
                                                        ]
                                                    }
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <div>
                                                    <div className="font-semibold">
                                                        Next Date
                                                    </div>
                                                    <div>
                                                        {format(
                                                            new Date(
                                                                transaction.nextRecurringDate
                                                            ),
                                                            "PP"
                                                        )}
                                                    </div>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="flex items-center gap-1 px-2">
                                            <Clock className="h-4 w-4" />
                                            One-Time
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8">
                                                <MoreHorizontalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    router.push(
                                                        `/transaction/create?edit=${transaction.id}`
                                                    )
                                                }>
                                                Update
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-red-600">
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TransactionTable;
