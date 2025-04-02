const API_URL = import.meta.env.ENV_API_URL as string;
const Users_API = `${API_URL}/users`;

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    tickets?: number;
}

export interface UserList {
    users: User[];
}

export type UserCreate = Omit<User, 'id'>;

export type UserUpdate = Partial<User>;

export async function getUsers(): Promise<User[]> {
    const response = await fetch(Users_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: UserList = await response.json();
    return data.users;
}

export async function getUserById(id: number): Promise<User> {
    const response = await fetch(`${Users_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: User = await response.json();
    return data;
}

export async function createUser(user: UserCreate): Promise<User> {
    const response = await fetch(`${Users_API}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: User = await response.json();
    return data;
}

export async function updateUser(id: number, user: UserUpdate): Promise<User> {
    const response = await fetch(`${Users_API}/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: User = await response.json();
    return data;
}

export async function deleteUser(id: number): Promise<void> {
    const response = await fetch(`${Users_API}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
}

export async function login(email: string, password: string): Promise<User> {
    const response = await fetch(`${Users_API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: User = await response.json();
    return data;
}

export async function getTicketsByUserId(id: number): Promise<User> {
    const response = await fetch(`${Users_API}/tickets/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: User = await response.json();
    return data;
}

