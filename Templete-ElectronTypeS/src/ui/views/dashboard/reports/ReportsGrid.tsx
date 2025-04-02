import React from "react";
import { ReportUpperCards } from "./ReportUpperCards";
import { ReportGraph } from "./ReportGraph";
import { ReportLowerCards } from "./ReportLowerCards";
import { UniversalTopBar } from "../auxiliaryComponents/UniversalTopBar";

export const ReportsGrid = () => {
    return (
        <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
        <div className="px-4 grid gap-3 grid-cols-12">
            <div className="col-span-12">
                <UniversalTopBar />
            </div>
            <ReportUpperCards />
            <ReportGraph />
            <ReportLowerCards />
        </div>
        </div>
    );
};