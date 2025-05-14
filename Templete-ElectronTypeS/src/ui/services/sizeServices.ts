const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const Size_API = `${API_URL}/sizes`;

export interface Size {
  id: number;
  name: string;
  price: number;
  image: File | null;
}

export interface SizeList {
  sizes: Size[];
}

export type SizeCreate = Omit<Size, 'id'>;
export type SizeUpdate = Partial<Size> & { id: number };

// Obtener todos los tamaños
export async function getSizes(): Promise<Size[]> {
  const response = await fetch(Size_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener tamaños: ' + response.statusText);
  }
  return await response.json();
}

export async function getSizeById(id: number): Promise<Size> {
    const response = await fetch(`${Size_API}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener tamaño: ' + response.statusText);
    }
  
    const data = await response.json();
  
    // ✅ Solo regresa `data`, no `data.size`
    return data;
  }

// Crear tamaño (con imagen)
export async function createSize(size: FormData): Promise<Size> {
  const response = await fetch(`${Size_API}/create`, {
    method: 'POST',
    body: size,
  });
  if (!response.ok) {
    throw new Error('Error al crear tamaño: ' + response.statusText);
  }
  return await response.json();
}

// Actualizar tamaño (sin imagen, JSON puro)
export async function updateSize(size: SizeUpdate): Promise<Size> {
  const { id, ...data } = size;
  const response = await fetch(`${Size_API}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar tamaño: ' + response.statusText);
  }
  return await response.json();
}

// Eliminar tamaño
export async function deleteSize(id: number): Promise<void> {
  const response = await fetch(`${Size_API}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error al eliminar tamaño: ' + response.statusText);
  }
}
