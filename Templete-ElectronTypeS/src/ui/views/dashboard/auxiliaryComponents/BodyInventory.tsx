import React from "react";
import { UniversalTopBar } from "./UniversalTopBar";
import InventoryTable from "./../tables/InventoryTable";

export const BodyInventory = () => {
    return (
        <div className="w-full px-4 grid gap-3 grid-cols-12">
            <div className="col-span-12 w-full">
                <UniversalTopBar />
            </div>
            <div className="col-span-12 w-full">
                <InventoryTable />
            </div>
        </div>
    );
};