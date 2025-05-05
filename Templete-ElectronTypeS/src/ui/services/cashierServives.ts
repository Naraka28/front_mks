// Tipos reutilizables
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

export interface Order {
  id: number;
  product: ItemName;
  price: number;
  toppings: ItemName[];
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
    `${import.meta.env.VITE_ENV_API_URL}/tickets/pending`
  );
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}

export async function getCompletedTickets(): Promise<TicketsResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_ENV_API_URL}/tickets/completed`
  );
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}

export async function cancelTicket(id: number): Promise<CompletedResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_ENV_API_URL}/tickets/cancel`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }
  );

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}
export async function payTicket(id: number): Promise<CompletedResponse> {
  const response = await fetch(`${import.meta.env.VITE_ENV_API_URL}/tickets/pay`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
}
