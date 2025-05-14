const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const FLAVOR_API = `${API_URL}/flavours`;

export interface Flavor {
  id: number;
  name: string;
  price: number;
  image: File | null;
}

export interface FlavorList {
  flavors: Flavor[];
}

export type FlavorCreate = Omit<Flavor, 'id'>;
export type FlavorUpdate = Partial<Flavor>;

// Obtener todos los sabores
export async function getFlavors(): Promise<Flavor[]> {
  const response = await fetch(FLAVOR_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener sabores: ' + response.statusText);
  }
  return await response.json();
}

// Obtener sabor por ID
export const getFlavorById = async (id: number) => {
    const response = await fetch(`${API_URL}/flavours/${id}`);
    const data = await response.json();
    return data.flavour;
  };


export async function createFlavor(flavor: FormData): Promise<Flavor> {
  const response = await fetch(`${FLAVOR_API}/create`, {
    method: 'POST',
    body: flavor,
  });
  if (!response.ok) {
    throw new Error('Error al crear el sabor: ' + response.statusText);
  }
  return await response.json();
}

export async function updateFlavor({
  id,
  data,
}: {
  id: number;
  data: { name: string; price: number };
}): Promise<Flavor> {
  const response = await fetch(`${FLAVOR_API}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el sabor: ' + response.statusText);
  }
  return await response.json();
}

// Eliminar sabor
export async function deleteFlavor(id: number): Promise<void> {
  const response = await fetch(`${FLAVOR_API}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el sabor: ' + response.statusText);
  }
}
