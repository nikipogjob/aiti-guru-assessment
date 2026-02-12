export type Product = {
    id: number;
    name: string;
    vendor: string;
    sku: string;
    rating: number;
    price: number;
    category: string;
    selected?: boolean;
};