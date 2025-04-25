import { Flavor, FlavorList } from "./flavorServices";
import { Milk, MilkList } from "./milksServices";
import { Size, SizeList } from "./sizeServices";
import { Temp, TempList } from "./tempsServices";
import { Topping, ToppingList } from "./toppingsServices";

const API_URL = import.meta.env.VITE_ENV_API_URL as string;
const Products_API = `${API_URL}/products`;
const ProductsType_API = `${API_URL}/product_types`;


export interface Product {
    id: number;
    name: string;
    base_price: number;
    type: string;
    image: File | null;
    flavours: Flavor[];
    toppings: Topping[];
    sizes: Size[];
    milks: Milk[];
    temps: Temp[];
}

export interface ProductList {
    products: Product[];
}

export type ProductCreate = Omit<Product, 'id'>;
export type ProductCreatePartial = Partial<ProductCreate>;

export type ProductUpdate = Partial<Product>;

export async function getProducts(): Promise<Product[]> {
    // console.log('API_URL:', API_URL);
    // console.log('Products_API:', Products_API);
    const response = await fetch(Products_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Product[] = await response.json();
 
    return data;


}

export async function getProductTypes(): Promise<Product[]> {
    const response = await fetch(`${ProductsType_API}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Product[] = await response.json();
    return data;
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

export async function createProduct(product: FormData): Promise<Product> {
    const response = await fetch(`${Products_API}/create`, {
        method: 'POST',
        body: product
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

export async function getAllowedMilks(productID:number): Promise<Milk[]> {
    const response = await fetch(`${Products_API}/allowed_milks/${productID}`, {
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

export async function getAllowedSizes(productID:number): Promise<Size[]> {
    const response = await fetch(`${Products_API}/allowed_sizes/${productID}`, {
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

export async function getAllowedFlavors(productID:number): Promise<Flavor[]> {
    const response = await fetch(`${Products_API}/allowed_flavours/${productID}`, {
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

export async function getAllowedToppings(productID:number): Promise<Topping[]> {
    const response = await fetch(`${Products_API}/allowed_toppings/${productID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }
    const data: Topping[] = await response.json();
    return data;

}

export async function getAllowedTemps(productID:number): Promise<Temp[]> {
    const response = await fetch(`${Products_API}/allowed_temps/${productID}`, {
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
