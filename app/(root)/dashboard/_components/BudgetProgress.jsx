"use client";

import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Pen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { updateBudget } from "@/actions/budget";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(
        initialBudget?.amount.toString() || ""
    );

    const percentageUsed = initialBudget
        ? (currentExpenses / initialBudget.amount) * 100
        : 0;

    const {
        loading: isLoading,
        fn: updateBudgetFn,
        data: updatedBudget,
        error,
    } = useFetch(updateBudget);

    const handleUpdateChange = async () => {
        const amount = parseFloat(newBudget);
        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        await updateBudgetFn(amount);
    };

    useEffect(() => {
        if (updatedBudget?.success) {
            setIsEditing(false);
            toast.success("Budget updated successfully");
        }
    }, [updatedBudget]);

    useEffect(() => {
        if (error) {
            setIsEditing(false);
            toast.error("Failed to update budget");
        }
    }, [error]);

    const handleCancel = () => {
        setNewBudget(initialBudget?.amount.toString() || "");
        setIsEditing(false);
    };

    return (
        <div>
            <Card className="shadow-md border rounded-xl">
                <CardHeader className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <CardTitle className="text-md md:text-xl font-semibold mr-4">
                            Monthly Budget{" "}
                            <span className="text-muted-foreground">
                                (Default Account)
                            </span>
                        </CardTitle>

                        {isEditing ? (
                            <div className="flex flex-col md:flex-row items-center gap-2">
                                <Input
                                    type="number"
                                    value={newBudget}
                                    onChange={(e) =>
                                        setNewBudget(e.target.value)
                                    }
                                    className="h-8 text-md"
                                    placeholder="Enter amount"
                                    autoFocus
                                />
                                <div className="md:flex md:gap-2">
                                    <Button
                                        disabled={isLoading}
                                        onClick={handleUpdateChange}
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 cursor-pointer">
                                        <Check className="h-4 w-4 text-green-500" />
                                    </Button>
                                    <Button
                                        disabled={isLoading}
                                        onClick={handleCancel}
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 cursor-pointer">
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <CardDescription className="text-sm">
                                    {initialBudget
                                        ? `$${currentExpenses.toFixed(
                                              2
                                          )}/$${initialBudget.amount.toFixed(
                                              2
                                          )}`
                                        : "No budget set yet"}
                                </CardDescription>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsEditing(true)}
                                    className="h-7 w-7 cursor-pointer">
                                    <Pen className="h-3.5 w-3.5 text-gray-600" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="py-4">
                    {initialBudget && (
                        <div className="space-y-2">
                            <Progress
                                value={percentageUsed}
                                customStyles={`${
                                    percentageUsed >= 90
                                        ? "bg-red-500"
                                        : percentageUsed >= 70
                                        ? "bg-yellow-500"
                                        : "bg-green-600"
                                }`}
                            />
                            <p className="text-xs text-muted-foreground text-right">{percentageUsed.toFixed(2)}% Used</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default BudgetProgress;
