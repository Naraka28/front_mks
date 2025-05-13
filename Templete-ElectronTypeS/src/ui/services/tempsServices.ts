const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const Temps_API = `${API_URL}/temps`;

export interface Temp {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface TempList {
    temps: Temp[];
}

export type TempCreate = Omit<Temp, 'id'>;

export type TempUpdate = Partial<Temp>;

export async function getTemps(): Promise<Temp[]> {
    const response = await fetch(Temps_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Temp[] = await response.json();
    return data;
}

export async function getTempById(id: number): Promise<Temp> {
    const response = await fetch(`${Temps_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Temp = await response.json();
    return data;
}

export async function createTemp(temp: TempCreate): Promise<Temp> {
    const response = await fetch(`${Temps_API}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(temp),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Temp = await response.json();
    return data;
}

export async function updateTemp(id: number, temp: TempUpdate): Promise<Temp> {
    const response = await fetch(`${Temps_API}/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(temp),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Temp = await response.json();
    return data;
}

export async function deleteTemp(id: number): Promise<void> {
    const response = await fetch(`${Temps_API}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
}

