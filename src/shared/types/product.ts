export interface Product {
    id: number;
    title: string;
    category: string;
    brand: string;
    sku: string;
    rating: number;
    price: number;
    selected?: boolean;
};
export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number
};

export type SortBy = 'price' | 'rating' | 'title';
export type SortOrder = 'asc' | 'desc';

export type SortState = {
    sortBy: SortBy;
    order: SortOrder;
} | null;