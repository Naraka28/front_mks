const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const Size_API = `${API_URL}/sizes`;

export interface Size{
    id:number;
    name: string;
    price: number;
    image: File | null;
}

export interface SizeList{
    sizes: Size[];
}

export type SizeCreate = Omit<Size, 'id'>;

export type SizeUpdate = Partial<Size>;



export async function getSizes(): Promise<Size[]> {
    const response = await fetch(Size_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Size[] = await response.json();
    return data;
}

export async function getSizeById(id: number): Promise<Size> {
    const response = await fetch(`${Size_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Size = await response.json();
    return data;
}


export async function createSize(Size: FormData): Promise<Size> {
    const response = await fetch(`${Size_API}/create`, {
        method: 'POST',
        body:Size
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Size = await response.json();
    return data;
}


export async function updateSize(Size: SizeUpdate): Promise<Size> {
    const response = await fetch(`${Size_API}/update/${Size.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Size),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Size = await response.json();
    return data;
}

export async function deleteSize(id: number): Promise<void> {
    const response = await fetch(`${Size_API}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
}