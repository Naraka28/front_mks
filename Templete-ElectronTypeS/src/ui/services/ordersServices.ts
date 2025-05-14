const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const ORDERS_API = `${API_URL}/orders`;


export interface ItemName {
    name: string;
}

interface OrderTopping {
    topping: ItemName;
    quantity: number;
}

export interface Order {
    id: number;
    productId: number;
    price: number;
    flavour: number;
    milk: number;
    size: number;
    orderToppings: OrderTopping[];
    temp: number;
    ticketId: number;
}

export interface OrderList {
    orders: Order[];
}

export type OrderCreate = Omit<Order, 'id' | 'ticketId'>;

export type OrderUpdate = Partial<Order>;

export async function getOrders(): Promise<Order[]> {
    const response = await fetch(ORDERS_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: OrderList = await response.json();
    return data.orders;
}

export async function getOrderById(id: number): Promise<Order> {
    const response = await fetch(`${ORDERS_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Order = await response.json();
    return data;
}


export async function createOrderWithTicket(order: OrderCreate): Promise<Order> {
    console.log('Creating order with ticket:', order);
    const response = await fetch(`${ORDERS_API}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Order = await response.json();
    return data;
}

export async function getOrdersByTicketId(ticketId: number): Promise<Order[]> {
    const response = await fetch(`${ORDERS_API}/ticket/${ticketId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: OrderList = await response.json();
    return data.orders;
}
