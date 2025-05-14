const API_URL = import.meta.env.VITE_ENV_API_URL as string;

export interface ItemName {
  name: string;
}

export interface Cashier {
  id: number;
  name: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
  error: string;
}

export interface CompletedResponse {
  message: string;
}

interface OrderTopping {
  topping: ItemName;
  quantity: number;
}

export interface Order {
  id: number;
  product: ItemName;
  price: number;
  orderToppings: OrderTopping[];
  flavour: ItemName;
  size: ItemName;
  milk: ItemName;
  temp: ItemName;
}

export interface TicketsResponse {
  id: number;
  ticket_date: string;
  ticket_time: string;
  total: number;
  payment_method: string;
  status: string;
  cashier: Cashier;
  orders: Order[];
}

export interface TicketsResponseAll{
  tickets: TicketsResponse[];
}

export async function getPendingTickets(): Promise<TicketsResponse> {
  const response = await fetch(
    `${API_URL}/tickets/pending`
  );
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}

export async function getCompletedTickets(): Promise<TicketsResponse> {
  const response = await fetch(
    `${API_URL}/tickets/completed`
  );
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}

export async function cancelTicket(id: number): Promise<CompletedResponse> {
  const response = await fetch(
    `${API_URL }/tickets/cancel`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}

export async function payTicket(id: number): Promise<CompletedResponse> {
  const response = await fetch(`${API_URL}/tickets/pay`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}

export async function getAllTickets(): Promise<TicketsResponseAll> {
  const response = await fetch(
    `${API_URL}/tickets`
  );
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}