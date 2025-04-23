// src/cashier/CashierLayout.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CashierSidebar from './CashierSidebar/CashierSidebar';
import BodyCashier from './BodyCashier';

export const CashierLayout: React.FC = () => {
    return (
        <div className="flex ">

            <aside className="w-64 p-4 bg-stone-100 sticky top-0 h-screen" >
                <CashierSidebar />
            </aside>

            <main className="flex-1 p-4 bg-stone-50 min-h-screen">
                <Routes>
                    <Route
                        index
                        element={<BodyCashier orderStatus="pending" />}
                    />

                    <Route
                        path="/:ticketId"
                        element={<BodyCashier orderStatus="pending" />}
                    />

                    <Route
                        path="completados"
                        element={<BodyCashier orderStatus="completed" />}
                    />

                    <Route
                        path="completados/:ticketId"
                        element={<BodyCashier orderStatus="completed" />}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default CashierLayout;
