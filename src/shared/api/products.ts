import type { ProductsResponse, SortBy, SortOrder } from '../types/product';
import { http } from './http';


export async function fetchProducts(params: {
    limit: number;
    skip: number;
    sortBy?: SortBy;
    order?: SortOrder;
    searchQuery?: string;
}) {
    const { searchQuery, ...restParams } = params;
    const endpoint =
        searchQuery && searchQuery.trim().length > 0
            ? '/products/search'
            : '/products';

    const response = await http.get<ProductsResponse>(endpoint, {
        params: {
            ...restParams,
            ...(
                searchQuery
                    ? { q: searchQuery.trim() }
                    : {}),
            select: 'id,title,category,brand,sku,rating,price',
        },
    });
    return response.data;
}
