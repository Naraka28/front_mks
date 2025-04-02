const API_URL = import.meta.env.ENV_API_URL as string;
const Products_API = `${API_URL}/products`;

export interface Product {
    id: number;
    name: string;
    base_price: number;
    type: string;
    image: string;
    flavours: number[];
    toppings: number[];
    sizes: number[];
    milks: number[];
    temps: number[];
}

export interface ProductList {
    products: Product[];
}

export type ProductCreate = Omit<Product, 'id'>;

export type ProductUpdate = Partial<Product>;

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(Products_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: ProductList = await response.json();
    return data.products;
}

export async function getProductById(id: number): Promise<Product> {
    const response = await fetch(`${Products_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Product = await response.json();
    return data;
}

export async function createProduct(product: ProductCreate): Promise<Product> {
    const response = await fetch(`${Products_API}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Product = await response.json();
    return data;
}

export async function updateProduct(product: ProductUpdate, id:number): Promise<Product> {
    const response = await fetch(`${Products_API}/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Product = await response.json();
    return data;
}

export async function deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${Products_API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
}

export async function getProductsByFlavour(flavourId: number): Promise<Product[]> {
    const response = await fetch(`${Products_API}/flavours/${flavourId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: ProductList = await response.json();
    return data.products;
}

export async function getProductsByType(typeId: number): Promise<Product[]> {
    const response = await fetch(`${Products_API}/type/${typeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: ProductList = await response.json();
    return data.products;
}
export async function getProductsBySize(sizeId: number): Promise<Product[]> {
    const response = await fetch(`${Products_API}/size/${sizeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: ProductList = await response.json();
    return data.products;
}

export async function getProductsByTemp(tempId: number): Promise<Product[]> {
    const response = await fetch(`${Products_API}/temp/${tempId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: ProductList = await response.json();
    return data.products;
}
