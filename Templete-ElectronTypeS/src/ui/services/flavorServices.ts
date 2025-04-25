const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const FLAVOR_API = `${API_URL}/flavours`;

export interface Flavor{
    id:number;
    name: string;
    price: number;
    image: File | null;
}

export interface FlavorList{
    flavors: Flavor[];
}

export type FlavorCreate = Omit<Flavor, 'id'>;

export type FlavorUpdate = Partial<Flavor>;



export async function getFlavors(): Promise<Flavor[]> {
    console.log('Flavors_API:', FLAVOR_API);
    const response = await fetch(FLAVOR_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Flavor[] = await response.json();
    return data;
}

export async function getFlavorById(id: number): Promise<Flavor> {
    const response = await fetch(`${FLAVOR_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Flavor = await response.json();
    return data;
}


export async function createFlavor(flavor: FormData): Promise<Flavor> {
    const response = await fetch(`${FLAVOR_API}/create`, {
        method: 'POST',
        body: flavor
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Flavor = await response.json();
    return data;
}


export async function updateFlavor(flavor: FlavorUpdate): Promise<Flavor> {
    const response = await fetch(`${FLAVOR_API}/update/${flavor.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(flavor),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Flavor = await response.json();
    return data;
}

export async function deleteFlavor(id: number): Promise<void> {
    const response = await fetch(`${FLAVOR_API}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
}
