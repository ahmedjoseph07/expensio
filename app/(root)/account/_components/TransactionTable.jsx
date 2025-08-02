"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import {
    ChevronDown,
    ChevronUp,
    Clock,
    Loader,
    MoreHorizontalIcon,
    RefreshCcwDot,
    Search,
    Trash,
    X,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { bulkDeleteTransactions } from "@/actions/account";
import { toast } from "sonner";
import { BarLoader, PuffLoader } from "react-spinners";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [recurringFilter, setRecurringFilter] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc",
    });

    const {
        loading: deleteLoading,
        fn: deleteFn,
        data: deleted,
    } = useFetch(bulkDeleteTransactions);

    const handleBulkDelete = async () => {
        await deleteFn(selectedIds);
        setSelectedIds([]);
    };

    useEffect(() => {
        if (deleted && !deleteLoading) {
            toast.success("Transactions deleted successfully");
        }
    }, [deleted, deleteLoading]);

    const filteredAndSortedTransactions = useMemo(() => {
        let result = [...transactions];
        // Search Filter
        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter((transaction) =>
                transaction.description?.toLowerCase().includes(searchLower)
            );
        }
        // Recurring Filter
        if (recurringFilter) {
            result = result.filter((transaction) => {
                if (recurringFilter == "recurring")
                    return transaction.isRecurring;
                return !transaction.isRecurring;
            });
        }

        // Type Filter
        if (typeFilter) {
            result = result.filter(
                (transaction) => transaction.type === typeFilter
            );
        }

        // Sorting
        result.sort((a, b) => {
            let comp = 0;
            switch (sortConfig.field) {
                case "date":
                    comp = new Date(a.date) - new Date(b.date);
                    break;
                case "category":
                    comp = a.category.localeCompare(b.category);
                    break;
                case "amount":
                    comp = a.amount - b.amount;
                    break;
                default:
                    comp = 0;
            }

            return sortConfig.direction === "asc" ? comp : -comp;
        });

        return result;
    }, [transactions, search, typeFilter, recurringFilter, sortConfig]);

    const handleSort = (field) => {
        setSortConfig((current) => ({
            field,
            direction:
                current.field == field && current.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    const handleSelect = (id) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((item) => item != id)
                : [...current, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedIds((current) =>
            current?.length === filteredAndSortedTransactions?.length
                ? []
                : filteredAndSortedTransactions?.map(
                      (transaction) => transaction.id
                  )
        );
    };

    const handleClear = () => {
        setSearch("");
        setTypeFilter("");
        setRecurringFilter("");
        setSelectedIds([]);
    };

    return (
        <div className="space-y-4">
            {deleteLoading && (
                <BarLoader className="my-3 text-blue-500" width={"100%"} />
            )}
            {/*  Search and Fiter */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="px-7"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {/* Filter */}
                <div className="flex gap-2 flex-col md:flex-row">
                    <div className="flex gap-2">
                        {/* Type */}
                        <Select
                            value={typeFilter}
                            onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="INCOME">Income</SelectItem>
                                <SelectItem value="EXPENSE">Expense</SelectItem>
                            </SelectContent>
                        </Select>
                        {/* Recurring */}
                        <Select
                            value={recurringFilter}
                            onValueChange={setRecurringFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All Transactions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recurring">
                                    Recuring{" "}
                                </SelectItem>
                                <SelectItem value="non-recurring">
                                    Non Recurring
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        {selectedIds?.length > 0 && (
                            <div className="flex justify-center gap-2 ">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                        className="cursor-pointer"
                                            size="sm"
                                            variant="destructive"
                                            disabled={deleteLoading}>
                                            
                                            {deleteLoading ? (
                                                <>
                                                    <Loader className="h-4 w-4 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash className="h-4 w-4" />
                                                    Delete {selectedIds.length}{" "}
                                                    Selected
                                                </>
                                            )}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you sure?
                                            </AlertDialogTitle>
                                            <p>
                                                This action will permanently
                                                delete {selectedIds.length}{" "}
                                                transactions.
                                            </p>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel variant="outline" className="hover:text-red-500 hover:border-red-500">
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction 
                                            className="bg-red-500"
                                                onClick={handleBulkDelete}>
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}

                        {(search || typeFilter || recurringFilter) && (
                            <Button
                                size="sm"
                                onClick={handleClear}
                                className="cursor-pointer hover:border-red-500 hover:text-red-500"
                                variant="outline">
                                <X />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className="w-full overflow-x-auto rounded-md border bg-white shadow">
                <Table className="min-w-max">
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    onCheckedChange={handleSelectAll}
                                    checked={
                                        selectedIds?.length ===
                                            filteredAndSortedTransactions?.length &&
                                        filteredAndSortedTransactions?.length >
                                            0
                                    }
                                />
                            </TableHead>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort("date")}>
                                <div className="flex items-center">
                                    Date{" "}
                                    {sortConfig.field === "date" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ChevronUp />
                                        ) : (
                                            <ChevronDown />
                                        ))}
                                </div>
                            </TableHead>
                            <TableHead className="cursor-pointer">Description</TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort("category")}>
                                <div className="flex items-center">
                                    Category
                                    {sortConfig.field === "category" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ChevronUp />
                                        ) : (
                                            <ChevronDown />
                                        ))}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer text-right"
                                onClick={() => handleSort("amount")}>
                                <div className="flex items-center">
                                    Amount{" "}
                                    {sortConfig.field === "amount" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ChevronUp />
                                        ) : (
                                            <ChevronDown />
                                        ))}
                                </div>
                            </TableHead>
                            <TableHead>Recurring</TableHead>
                            <TableHead className="w-[50px] text-center">
                                Options
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedTransactions?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center text-muted-foreground py-6">
                                    No Transactions Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedTransactions?.map(
                                (transaction, i) => (
                                    <TableRow
                                        key={transaction.id}
                                        className="hover:bg-gray-50 transition-colors">
                                        <TableCell>
                                            <Checkbox
                                                onCheckedChange={() =>
                                                    handleSelect(transaction.id)
                                                }
                                                checked={selectedIds.includes(
                                                    transaction.id
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>
                                            {format(
                                                new Date(transaction.date),
                                                "PP"
                                            )}
                                        </TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {transaction.category
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    transaction.category.slice(
                                                        1
                                                    )}
                                            </Badge>
                                        </TableCell>
                                        <TableCell
                                            className={`font-medium ${
                                                transaction.type === "INCOME"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}>
                                            {transaction.type === "INCOME"
                                                ? "+"
                                                : "-"}
                                            ${transaction.amount.toFixed(2)}
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
                                                    <DropdownMenuItem
                                                        className="cursor-pointer text-red-600"
                                                        onClick={() =>
                                                            deleteFn([
                                                                transaction.id,
                                                            ])
                                                        }>
                                                            
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TransactionTable;
