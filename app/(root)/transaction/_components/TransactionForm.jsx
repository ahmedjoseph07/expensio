"use client";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/formSchema";
import useFetch from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CreateAccount from "@/components/CreateAccount";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, DollarSign, Loader, XCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import RecieptScanner from "./RecieptScanner";

const AddTransactionForm = ({
    accounts,
    editMode = false,
    initialData = null,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        reset,
    } = useForm({
        resolver: zodResolver(transactionSchema),

        defaultValues:
            editMode && initialData
                ? {
                      type: initialData.type,
                      amount: initialData.amount.toString(),
                      description: initialData.description,
                      accountId: initialData.accountId,
                      category: initialData.category,
                      date: new Date(initialData.date),
                      isRecurring: initialData.isRecurring,
                      ...(initialData.recurringInterval && {
                          recurringInterval: initialData.recurringInterval,
                      }),
                  }
                : {
                      type: "EXPENSE",
                      amount: "",
                      description: "",
                      accountId: accounts.find((ac) => ac.isDefault)?.id,
                      date: new Date(),
                      isRecurring: false,
                      recurringInterval: undefined,
                  },
    });

    const {
        loading: transactionLoading,
        fn: transactionFn,
        data: transactionResult,
    } = useFetch(editMode ? updateTransaction : createTransaction);

    const type = watch("type");
    const isRecurring = watch("isRecurring");
    const date = watch("date");

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            amount: parseFloat(data.amount),
        };

        if (!formData.isRecurring) {
            delete formData.recurringInterval;
        }
        if (editMode) {
            await transactionFn(editId, formData);
        } else {
            await transactionFn(formData);
        }
    };

    useEffect(() => {
        if (transactionResult?.success && !transactionLoading) {
            toast.success(
                editMode
                    ? "Transaction updated successfully"
                    : "Transaction created successfully"
            );
            reset();
            router.push(`/account/${transactionResult.data.accountId}`);
        }
    }, [transactionResult?.success, transactionLoading, editMode]);

    const handleScanComplete = (scannedData) => {
        if (scannedData) {
            setValue("amount", scannedData.amount.toString());
            setValue("date", new Date(scannedData.date));
            if (scannedData.description) {
                setValue("description", scannedData.description);
            }
            if (scannedData.category) {
                setValue("category", scannedData.category);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white mb-6 rounded-xl space-y-6 max-w-3xl mx-auto w-full">
            {/* AI Scanner */}
            <div className="place-self-end">
                <RecieptScanner onScanComplete={handleScanComplete} />
            </div>

            {/* Type */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                    onValueChange={(value) => setValue("type", value)}
                    defaultValue={type}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                        <SelectItem value="INCOME">Income</SelectItem>
                    </SelectContent>
                </Select>
                {errors.type && (
                    <p className="text-sm text-red-500">
                        {errors.type.message}
                    </p>
                )}
            </div>

            {/* Amount & Account */}
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("amount")}
                    />
                    {errors.amount && (
                        <p className="text-sm text-red-500">
                            {errors.amount.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Account</label>
                    <Select
                        onValueChange={(value) => setValue("accountId", value)}
                        defaultValue={getValues("accountId")}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Account" />
                        </SelectTrigger>
                        <SelectContent>
                            {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                    {account.name} ($
                                    {parseFloat(account.balance).toFixed(2)})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.accountId && (
                        <p className="text-sm text-red-500">
                            {errors.accountId.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input
                    type="text"
                    placeholder="e.g., Groceries, Salary"
                    {...register("category")}
                />
                {errors.category && (
                    <p className="text-sm text-red-500">
                        {errors.category.message}
                    </p>
                )}
            </div>

            {/* Date */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full pl-3 text-left font-normal">
                            {date ? (
                                format(date, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selected) => setValue("date", selected)}
                            disabled={(d) =>
                                d > new Date() || d < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {errors.date && (
                    <p className="text-sm text-red-500">
                        {errors.date.message}
                    </p>
                )}
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                    placeholder="Optional description"
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-sm text-red-500">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* Recurring Transaction */}
            <div className="flex justify-between items-center border p-3 rounded-lg">
                <div>
                    <p className="text-sm font-medium">Recurring Transaction</p>
                    <p className="text-xs text-gray-500">
                        Set as a recurring transaction
                    </p>
                </div>
                <Switch
                    checked={isRecurring}
                    onCheckedChange={(checked) =>
                        setValue("isRecurring", checked)
                    }
                />
            </div>

            {/* Recurring Interval */}
            {isRecurring && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Recurring Interval
                    </label>
                    <Select
                        onValueChange={(value) =>
                            setValue("recurringInterval", value || undefined)
                        }
                        defaultValue={getValues("recurringInterval")}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Interval" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DAILY">Daily</SelectItem>
                            <SelectItem value="WEEKLY">Weekly</SelectItem>
                            <SelectItem value="MONTHLY">Monthly</SelectItem>
                            <SelectItem value="YEARLY">Yearly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    type="button"
                    onClick={() => router.back()}
                    variant="outline"
                    className="flex-1 hover:border-red-500 hover:text-red-500">
                    <XCircle className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={transactionLoading}
                    className="flex-1">
                    <DollarSign className="mr-2 h-4 w-4" />{" "}
                    {transactionLoading ? (
                        <>
                            <Loader className="animate-spin"></Loader>
                            {editMode
                                ? "Updating Transaction"
                                : "Creating Transaction"}
                        </>
                    ) : editMode ? (
                        "Update Transaction"
                    ) : (
                        "Create Transaction"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default AddTransactionForm;
