// OrderContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface OrderItem {
    itemId?: string;
    tempId?: string;
    sizeId?: string;
    flavourId?: string;
    coffeeBeansId?: string;
    milkId?: string;
    toppings?: Record<number, number>;
    total?: number;
}

interface OrderContextType {
    orders: OrderItem[];
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

    const addOrder = (order: OrderItem) => {
        setOrders(prev => [...prev, order]);
    };

    const clearOrders = () => {
        setOrders([]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => useContext(OrderContext);