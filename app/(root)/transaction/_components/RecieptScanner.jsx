"use client";
import { scanReciept } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { Loader, LucideCamera } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

const RecieptScanner = ({onScanComplete}) => {
    const fileInputRef = useRef();

    const {
        loading: scanRecieptLoading,
        fn: scanReceiptFn,
        data: scannedData,
    } = useFetch(scanReciept);

    const handleRecieptScan = async(file) => {
        if(file.size > 5 *1024 *1024){
            toast.error("File size should be less than 5MB");
            return;
        }
        await scanReceiptFn(file)
    };

    useEffect(()=>{
        if(scannedData && !scanRecieptLoading){
            onScanComplete(scannedData);
            toast.success("Reciept scanned successfully");
        }
    },[scanRecieptLoading,scannedData])

    return (
        <div className="flex justify-center items-center gap-2">
            <Input
                className="hidden"
                accept="image/*"
                capture="enviroment"
                ref={fileInputRef}
                type="file"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleRecieptScan(file);
                }}
            />
            <Button
                className="animate-pulse w-full bg-gradient-to-br from-blue-500 via-white-500 to-purple-500 opacity-80 hover:opacity-100 hover:animate-none"
                type="button"
                onClick={()=>fileInputRef.current?.click()}
                disabled={scanRecieptLoading}
                >
                {scanRecieptLoading ? (
                    <>
                        <Loader className="animate-spin" />
                        <span>Scanning Reciept</span>
                    </>
                ) : (
                    <>
                        <LucideCamera />
                        <span>Scan Reciept</span>
                    </>
                )}
            </Button>
        </div>
    );
};

export default RecieptScanner;
