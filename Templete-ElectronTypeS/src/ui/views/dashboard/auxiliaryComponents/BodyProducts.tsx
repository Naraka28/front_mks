import React from "react";
import { UniversalTopBar } from "./UniversalTopBar";
import ProductsTable from "./../tables/ProductsTable";
import SearchbarProducts from "./SearchbarProducts";

export const BodyProducts = () => {
    return (
        <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
        <div className="w-full px-4 grid gap-3 grid-cols-12">
            <div className="col-span-12 w-full">
                <UniversalTopBar />
            </div>
            <div className="col-span-12 w-full">
                <SearchbarProducts />
            </div>
            <div className="col-span-12 w-full">
                <ProductsTable />
            </div>
        </div>
        </div>
    );
};