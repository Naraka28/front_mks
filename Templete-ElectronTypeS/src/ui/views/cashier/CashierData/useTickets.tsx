import { useState } from 'react';

export const calculateTotal = (order: OrderItem) => {
    const product = menuItems.find(p => p.id === order.productId);
    const size = sizeItems.find(s => s.id === order.sizesId);
    const milk = milksOptions.find(m => m.id === order.milksId);
    const flavour = flavourOptions.find(f => f.id === order.flavoursId);

    let toppingsTotal = 0;
    order.toppings.forEach(({ id, quantity }) => {
        const topping = toppingOptions.find(t => t.id === id);
        if (topping) {
            const free = topping.freecuantity;
            toppingsTotal += Math.max(quantity - free, 0) * topping.price;
        }
    });

    const basePrice = product?.basePrice || 0;
    const sizePrice = size?.price || 0;
    const milkPrice = milk?.price || 0;
    const flavourPrice = flavour?.price || 0;

    const subtotal = basePrice + sizePrice + milkPrice + flavourPrice + toppingsTotal;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    return {
        productName: product?.name || 'Producto no encontrado',
        sizeName: size?.name || '',
        tempName: tempOptions.find(t => t.id === order.tempId)?.name || '',
        flavourName: flavour?.name || '',
        milkName: milk?.name || '',
        basePrice: basePrice.toFixed(2),
        sizePrice: sizePrice.toFixed(2),
        milkPrice: milkPrice.toFixed(2),
        flavourPrice: flavourPrice.toFixed(2),
        toppingsTotal: toppingsTotal.toFixed(2),
        subtotal: subtotal.toFixed(2),
        iva: iva.toFixed(2),
        total: total.toFixed(2)
    };
};

export const calculateTicketTotal = (orders: OrderItem[]): number => {
    return orders.reduce((acc, order) => {
        const total = parseFloat(calculateTotal(order).total);
        return acc + total;
    }, 0);
};

// Interfaces de datos
export interface OrderItem {
    id: number;
    productId: number;
    tempId: number;
    sizesId: number;
    flavoursId: number;
    milksId: number;
    cashierId: number;
    toppings: { id: number; quantity: number }[];
    price?: number;
}

export interface Roles {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: Roles;
}

export interface Ticket {
    id: number;
    status: 'pending' | 'completed';
    total: number;
    payment_method: string;
    ticket_date: Date;
    cashier: User;
    orders: OrderItem[];
}

export interface BodyCashierProps {
    orderStatus: 'pending' | 'completed';
}

export const menuItems = [
    { id: 1, name: "Té caliente", basePrice: 20 },
    { id: 2, name: "Espresso", basePrice: 25 },
    { id: 3, name: "Latte", basePrice: 30 },
    { id: 4, name: "Cappuccino", basePrice: 35 }
];

export const toppingOptions = [
    { id: 1, name: "Azúcar", price: 2, freecuantity: 1 },
    { id: 2, name: "Canela", price: 1, freecuantity: 2 },
    { id: 5, name: "Fruta", price: 1, freecuantity: 1 },
    { id: 6, name: "Nutella", price: 6, freecuantity: 0 },
    { id: 7, name: "Shot", price: 3, freecuantity: 1 }
];

export const tempOptions = [
    { id: 1, name: "Caliente" },
    { id: 2, name: "Tibio" },
    { id: 3, name: "Frío" }
];

export const sizeItems = [
    { id: 1, name: "Short", price: 0 },
    { id: 2, name: "Tall", price: 5 },
    { id: 3, name: "Grande", price: 10 }
];

export const flavourOptions = [
    { id: 1, name: "Vainilla", price: 0 },
    { id: 3, name: "Caramelo", price: 0 },
    { id: 6, name: "Café", price: 12 }
];

export const milksOptions = [
    { id: 1, name: "Entera", price: 1.5 },
    { id: 2, name: "Deslactosada", price: 0 },
    { id: 3, name: "Almendras", price: 2.0 }
];

export interface OrderItem {
    id: number;
    productId: number;
    tempId: number;
    sizesId: number;
    flavoursId: number;
    milksId: number;
    cashierId: number;
    toppings: {
        id: number;
        quantity: number;
    }[];
    price?: number;
}


const exampleOrders: OrderItem[] = [
    {
        id: 1, productId: 2, tempId: 1, sizesId: 3, flavoursId: 1, milksId: 1, cashierId: 1,
        toppings: [{ id: 5, quantity: 2 }, { id: 6, quantity: 1 }]
    },
    {
        id: 2, productId: 3, tempId: 2, sizesId: 2, flavoursId: 3, milksId: 2, cashierId: 1,
        toppings: [{ id: 7, quantity: 2 }]
    },
    {
        id: 3, productId: 2, tempId: 3, sizesId: 1, flavoursId: 6, milksId: 3, cashierId: 1,
        toppings: [{ id: 5, quantity: 3 }, { id: 7, quantity: 1 }]
    },
    
];

const exampleOrders2: OrderItem[] = [
    {
        id: 4, productId: 1, tempId: 1, sizesId: 2, flavoursId: 1, milksId: 1, cashierId: 1,
        toppings: [{ id: 5, quantity: 2 }, { id: 6, quantity: 1 }]
    },
    {
        id: 5, productId: 1, tempId: 2, sizesId: 3, flavoursId: 3, milksId: 2, cashierId: 1,
        toppings: [{ id: 7, quantity: 2 }]
    },
];

export const exampleUser: User = {
    id: 1, name: 'Juan Luis Lagunas', email: 'Elpirata@gmail.com', password: '1234', roleId: { id: 1, name: 'Cajero' }
};

export const exampleTickets: Ticket[] = [
    {
        id: 1,
        status: 'pending',
        total: calculateTicketTotal(exampleOrders),
        payment_method: 'Efectivo',
        ticket_date: new Date(),
        cashier: exampleUser,
        orders: exampleOrders
    },
    {
        id: 2,
        status: 'completed',
        total: calculateTicketTotal(exampleOrders2),
        payment_method: 'Tarjeta',
        ticket_date: new Date(),
        cashier: exampleUser,
        orders: exampleOrders2
    },
];

export function useTickets(): Ticket[] {
    const [tickets] = useState<Ticket[]>(exampleTickets);
    return tickets;
}
