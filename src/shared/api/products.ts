import type { Product } from '../types/product';
import { http } from './http';

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number
};

export async function fetchProducts(params: {
    limit: number;
    skip: number;
}) {
    const response = await http.get<ProductsResponse>('/products', {
        params: {
            ...params,
            select: 'id,title,category,brand,sku,rating,price',
        },
    });
    return response.data;

}