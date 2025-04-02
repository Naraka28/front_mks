const API_URL = import.meta.env.ENV_API_URL as string;
const Size_API = `${API_URL}/sizes`;

export interface Size{
    id:number;
    name: string;
    price: number;
    image: string;
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
    const data: SizeList = await response.json();
    return data.sizes;
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


export async function createSize(Size: SizeCreate): Promise<Size> {
    const response = await fetch(`${Size_API}/create`, {
        method: 'POST',
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
