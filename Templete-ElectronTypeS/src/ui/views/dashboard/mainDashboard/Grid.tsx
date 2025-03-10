import React from "react";
import { StatCards } from "./StatCards";
import { Graph } from "./Graph";
import { RecentTransactions } from "./RecentTransactions";

export const Grid = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards />
      <Graph />
      <RecentTransactions />
    </div>
  );
};