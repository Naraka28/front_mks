import React from "react";
import { UniversalTopBar } from "./UniversalTopBar";
import ProductsTable from "./../tables/ProductsTable";
import SearchbarInventory from "./SearchbarInventory";

export const BodyInventory = () => {
    return (
        <div className="w-full px-4 grid gap-3 grid-cols-12">
            <div className="col-span-12 w-full">
                <UniversalTopBar />
            </div>
            <div className="col-span-12 w-full mt-0">
                <SearchbarInventory />
            </div>
            <div className="col-span-12 w-full">
                <ProductsTable />
            </div>
        </div>
    );
};