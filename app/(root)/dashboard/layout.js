import React, { Suspense } from "react";
import DashboardPage from "./page";
import { FadeLoader } from "react-spinners";

const DashboardLayout = () => {
    return (
        <div className="px-6">
            <h1 className="text-5xl font-bold gradient text-center md:text-start">
                Welcome to Dashboard
            </h1>
            <Suspense
                fallback={
                    <div className="flex justify-center py-8">
                        <FadeLoader />
                    </div>
                }>
                <DashboardPage />
            </Suspense>
        </div>
    );
};

export default DashboardLayout;
