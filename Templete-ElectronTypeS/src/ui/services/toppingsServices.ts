const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const Toppings_API = `${API_URL}/toppings`;

export interface Topping {
    id: number;
    name: string;
    price: number;
    max_quantity: number;
    free_quantity: number;
    //base_price: number;
    image: File | null;
}

export interface ToppingList {
    toppings: Topping[];
}

export type ToppingCreate = Omit<Topping, 'id'>;

export type ToppingUpdate = Partial<Topping>;

export async function getToppings(): Promise<Topping[]> {
    const response = await fetch(Toppings_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Topping[] = await response.json();
    return data;
}

export async function getToppingById(id: number): Promise<Topping> {
    const response = await fetch(`${Toppings_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Topping = await response.json();
    return data;
}

export async function createTopping(topping: FormData): Promise<Topping> {
    const response = await fetch(`${Toppings_API}/create`, {
        method: 'POST',
        body: topping,
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Topping = await response.json();
    return data;
}

export async function updateTopping(topping: ToppingUpdate): Promise<Topping> {
    const response = await fetch(`${Toppings_API}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(topping),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Topping = await response.json();
    return data;
}

export async function deleteTopping(id: number): Promise<void> {
    const response = await fetch(`${Toppings_API}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
}