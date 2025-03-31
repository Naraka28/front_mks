const API_URL = import.meta.env.ENV_API_URL as string;
const FLAVOR_API = `${API_URL}/flavors`;

export interface Flavor{
    id:number;
    name: string;
    price: number;
    image: string;
}

export interface FlavorList{
    flavors: Flavor[];
}

export type FlavorCreate = Omit<Flavor, 'id'>;

export type FlavorUpdate = Partial<Flavor>;



export async function getFlavors(): Promise<Flavor[]> {
    const response = await fetch(FLAVOR_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: FlavorList = await response.json();
    return data.flavors;
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


export async function createFlavor(flavor: FlavorCreate): Promise<Flavor> {
    const response = await fetch(`${FLAVOR_API}/create`, {
        method: 'POST',
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
