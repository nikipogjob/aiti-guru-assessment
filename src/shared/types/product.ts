export type Product = {
    id: number;
    title: string;
    category: string;
    brand: string;
    sku: string;
    rating: number;
    price: number;
    selected?: boolean;
};