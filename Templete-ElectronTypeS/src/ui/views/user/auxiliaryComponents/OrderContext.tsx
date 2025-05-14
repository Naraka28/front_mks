// OrderContext.tsx
import { OrderCreate } from "../../../services/ordersServices";

import React, { createContext, useContext, useState } from 'react';

interface OrderItem {
    order: OrderCreate;
}

interface OrderContextType {
    orders: OrderCreate[];
    addOrder: (order: OrderItem) => void;
    clearOrders: () => void;
}

const OrderContext = createContext<OrderContextType>({
    orders: [],
    addOrder: () => { },
    clearOrders: () => { },
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<OrderItem[]>([]);

    const addOrder = (order: OrderItem) => setOrders(prev => [...prev, order]);
    const clearOrders = () => setOrders([]);

    return (
        <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => useContext(OrderContext);