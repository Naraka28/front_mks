import { TicketsResponse } from "./cashierServives";
import { Order } from "./ordersServices";
import { User } from "./usersServices";

const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const TICKETS_API = `${API_URL}/tickets`;

export interface Ticket {
    id: number; 
    ticket_date: Date;
    total: number;
    cashier: User;
    orders: Order[];
}

export interface TicketList {
    tickets: Ticket[];
}

export type TicketCreate = Omit<Ticket, 'id'>;

export type TicketUpdate = Partial<Ticket>;

export async function getTickets(): Promise<TicketsResponse[]> {
    const response = await fetch(TICKETS_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketsResponse[] = await response.json();
    return data;
}

export async function getTicketByID(id:number): Promise<Ticket> {
    const response = await fetch(`${TICKETS_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Ticket = await response.json();
    return data;
}


export async function createTicket(ticket: TicketCreate): Promise<Ticket> {
    const response = await fetch(`${TICKETS_API}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Ticket = await response.json();
    return data;
}

export async function updateTicket(ticket: TicketUpdate): Promise<Ticket> {
    const response = await fetch(`${TICKETS_API}/update/${ticket.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Ticket = await response.json();
    return data;
}

export async function deleteTicket(id: number): Promise<void> {
    const response = await fetch(`${TICKETS_API}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
}

export async function getTicketsByCashier(cashierID:number): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/cashier/${cashierID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getTicketsByDate(date: Date): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/date/${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async  function getTodayTickets(): Promise<Ticket[]> {
    
    const response = await fetch(`${TICKETS_API}/today`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getLastMonthTickets(): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/last_month`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getLastWeekTickets(): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/last_week`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getTicketsByDateRange(from: Date, to: Date): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/date_range/${from}/${to}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getTicketsByTotalRange(min: number, max: number): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/total/${min}/${max}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getTicketsByCashierAndDate(cashierID: number, date: Date): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/cashier/${cashierID}/date/${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getTicketsByCashierAndDateRange(cashierID: number, from: Date, to: Date): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/cashier/${cashierID}/date_range/${from}/${to}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getTicketsByTotalAndDateRange(min: number, max: number, from: Date, to: Date): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/total/${min}/${max}/date_range/${from}/${to}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getTicketsByPaymentMethod(paymentMethod: string): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/payment_method/${paymentMethod}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}

export async function getTicketsByOrderId(orderId: number): Promise<Ticket[]> {
    const response = await fetch(`${TICKETS_API}/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: TicketList = await response.json();
    return data.tickets;
}