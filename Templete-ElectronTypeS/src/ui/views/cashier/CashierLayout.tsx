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
                        element={<BodyCashier orderStatus="Pendiente" />}
                    />

                    <Route
                        path="/:ticketId"
                        element={<BodyCashier orderStatus="Pendiente" />}
                    />

                    <Route
                        path="completados"
                        element={<BodyCashier orderStatus="Completado" />}
                    />

                    <Route
                        path="completados/:ticketId"
                        element={<BodyCashier orderStatus="Completado" />}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default CashierLayout;
