// Tipos reutilizables
interface ItemName {
  name: string;
}

interface Cashier {
  id: number;
  name: string;
}

interface ErrorResponse {
  message: string;
  status: number;
  error: string;
}

interface CompletedResponse {
  message: string;
}

interface Order {
  id: number;
  product: ItemName;
  price: number;
  toppings: ItemName[];
  flavour: ItemName;
  size: ItemName;
  milk: ItemName;
  temp: ItemName;
}

interface TicketsResponse {
  id: number;
  ticket_date: string;
  ticket_time: string;
  total: number;
  payment_method: string;
  status: string;
  cashier: Cashier;
  orders: Order[];
}

async function getPendingTickets(): Promise<TicketsResponse> {
  const response = await fetch(
    `${process.env.VITE_ENV_API_URL}/tickets/pending`
  );
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}
async function getCompletedTickets(): Promise<TicketsResponse> {
  const response = await fetch(
    `${process.env.VITE_ENV_API_URL}/tickets/completed`
  );
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}

async function cancelTicket(id: number): Promise<CompletedResponse> {
  const response = await fetch(
    `${process.env.VITE_ENV_API_URL}/tickets/cancel`,
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
async function payTicket(id: number): Promise<CompletedResponse> {
  const response = await fetch(`${process.env.VITE_ENV_API_URL}/tickets/pay`, {
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
