"use client";
import React, { useEffect, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { accountSchema } from "@/app/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import useFetch from "@/hooks/useFetch";
import { createAccount } from "@/actions/dashboard";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { PuffLoader } from "react-spinners";

const CreateAccount = ({ children }) => {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false,
        },
    });

    const {
        data: newAccount,
        error,
        fn: createAccountFn,
        loading: createAccountLoading,
    } = useFetch(createAccount);

    useEffect(()=>{
        if(newAccount && !createAccountLoading){
            toast.success("Account Created");
            reset();
            setOpen(false);
        }
    },[createAccountLoading,newAccount])

    useEffect(()=>{
        if(error){
            toast.error(error.message || "Failed to Create Account");
        }
    },[error])


    const onSubmit = async (data) => {
        await createAccountFn(data);
    };
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create New Account</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4">
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}>
                        {/* Account Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium">
                                Account Name
                            </label>
                            <Input
                                id="name"
                                placeholder="Checking"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Account Type */}
                        <div className="space-y-2">
                            <label
                                htmlFor="type"
                                className="text-sm font-medium">
                                Account Type
                            </label>
                            <Select
                                onValueChange={(value) =>
                                    setValue("type", value)
                                }
                                defaultValue={watch("type")}>
                                <SelectTrigger id="type" className="w-[180px]">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="CURRENT">
                                            Current
                                        </SelectItem>
                                        <SelectItem value="SAVINGS">
                                            Savings
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.type && (
                                <p className="text-sm text-red-500">
                                    {errors.type.message}
                                </p>
                            )}
                        </div>

                        {/* Initial Balance */}
                        <div className="space-y-2">
                            <label
                                htmlFor="balance"
                                className="text-sm font-medium">
                                Initial Balance
                            </label>
                            <Input
                                id="balance"
                                type="number"
                                step="0.1"
                                placeholder="0.00"
                                {...register("balance")}
                            />
                            {errors.balance && (
                                <p className="text-sm text-red-500">
                                    {errors.balance.message}
                                </p>
                            )}
                        </div>

                        {/* Default Field */}

                        <div className="space-y-2">
                            <label
                                htmlFor="isDefault"
                                className="text-sm font-medium">
                                Set as default
                            </label>
                            <p>Make this account default</p>
                            <Switch
                                id="isDefault"
                                onCheckedChange={(checked) =>
                                    setValue("isDefault", checked)
                                }
                                checked={watch("isDefault")}
                            />
                            {errors.balance && (
                                <p className="text-sm text-red-500">
                                    {errors.balance.message}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <DrawerClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="hover:text-red-500 hover:border-red-500">
                                    Cancel
                                </Button>
                            </DrawerClose>
                            <Button type="submit"
                            disabled={createAccountLoading}
                            >
                                {createAccountLoading ? (
                                    <>
                                        <Loader className="animate-spin"></Loader>
                                        Creating Account
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </div>

                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CreateAccount;
