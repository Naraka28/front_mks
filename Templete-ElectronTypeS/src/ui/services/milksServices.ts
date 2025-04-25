const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const Milk_API = `${API_URL}/milks`;

export interface Milk{
    id:number;
    name: string;
    price: number;
    image: File | null;
}

export interface MilkList{
    milks: Milk[];
}

export type MilkCreate = Omit<Milk, 'id'>;

export type MilkUpdate = Partial<Milk>;



// export async function getMilks(): Promise<Milk[]> {
//     const response = await fetch(Milk_API, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     if (!response.ok) {
//         throw new Error('Network response was not ok' + response.statusText);
//     }
//     const data: Milk[] = await response.json();
//     console.log(data);
//     return data;
// }

export async function getMilks(): Promise<Milk[]> {
    const response = await fetch(Milk_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Milk[] = await response.json();
    return data;
}



export async function getMilkById(id: number): Promise<Milk> {
    const response = await fetch(`${Milk_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Milk = await response.json();
    return data;
}


export async function createMilk(Milk: FormData): Promise<Milk> {
    const response = await fetch(`${Milk_API}/create`, {
        method: 'POST',
        body: Milk

    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Milk = await response.json();
    return data;
}


export async function updateMilk(Milk: MilkUpdate): Promise<Milk> {
    const response = await fetch(`${Milk_API}/update/${Milk.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Milk),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Milk = await response.json();
    return data;
}

export async function deleteMilk(id: number): Promise<void> {
    const response = await fetch(`${Milk_API}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
}
