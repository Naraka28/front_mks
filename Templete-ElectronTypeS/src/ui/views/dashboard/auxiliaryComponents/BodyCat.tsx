import React, { useState } from "react";
import { UniversalTopBar } from "./UniversalTopBar";
import CatTable from "./../tables/CatTable";
import Searchbar from "./Searchbar";

export const BodyCat = () => {



    
    return (
        <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
        <div className="w-full px-4 grid grid-cols-12">
            <div className="col-span-12 w-full">
                <UniversalTopBar />
            </div>
            <div className="col-span-12 w-full mt-0">
                <Searchbar />
            </div>
            <div className="col-span-12 w-full mt-3">
                <CatTable />
            </div>
        </div>
        </div>
    );
};
