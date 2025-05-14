const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const Toppings_API = `${API_URL}/toppings`;

export interface Topping {
  id: number;
  name: string;
  price: number;
  max_quantity: number;
  free_quantity: number;
  image: File | null;
}

export interface ToppingList {
  toppings: Topping[];
}

export type ToppingCreate = Omit<Topping, 'id'>;
export type ToppingUpdate = {
  id: number;
  data: {
    name: string;
    price: number;
    free_quantity: number;
    max_quantity: number;
  };
};

export async function getToppings(): Promise<Topping[]> {
  const response = await fetch(Toppings_API, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Error al obtener toppings: ' + response.statusText);
  }
  return await response.json();
}

export async function getToppingById(id: number): Promise<Topping> {
  const response = await fetch(`${Toppings_API}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Error al obtener topping: ' + response.statusText);
  }
  return await response.json();
}

export async function createTopping(topping: FormData): Promise<Topping> {
  const response = await fetch(`${Toppings_API}/create`, {
    method: 'POST',
    body: topping,
  });
  if (!response.ok) {
    throw new Error('Error al crear el topping: ' + response.statusText);
  }
  return await response.json();
}

export async function updateTopping({
  id,
  data,
}: ToppingUpdate): Promise<Topping> {
  const response = await fetch(`${Toppings_API}/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el topping: ' + response.statusText);
  }
  return await response.json();
}

export async function deleteTopping(id: number): Promise<void> {
  const response = await fetch(`${Toppings_API}/delete/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el topping: ' + response.statusText);
  }
}
