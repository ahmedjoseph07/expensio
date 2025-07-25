import React, { Suspense } from "react";
import DashboardPage from "./page";
import {PuffLoader} from "react-spinners";

const DashboardLayout = () => {
    return (
        <div className="px-6">
            <h1 className="text-5xl font-bold gradient">Dashboard</h1>
            <Suspense fallback={<PuffLoader className="mt-4" width="100%" />}>
                <DashboardPage />
            </Suspense>
        </div>
    );
};

export default DashboardLayout;
