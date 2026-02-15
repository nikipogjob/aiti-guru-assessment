import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebouncedValue } from '../../shared/lib/hooks/useDebouncedValue';
import { fetchProducts } from '../../shared/api/products';
import ProductsFooter from './ui/products-footer/products-footer';
import ProductsHeader from './ui/products-header/products-header';
import ProductsList from './ui/products-list/products-list';
import AddProductModal from '../../features/products/add-product/ui/add-product-modal/add-product-modal';
import PlusCircleIcon from '../../shared/ui/icons/plus-circle-icon';
import RefreshIcon from '../../shared/ui/icons/refresh-icon';
import styles from './products-page.module.scss';
import type { Product, SortBy, SortOrder, SortState } from '../../shared/types/product';
import type { ProductsResponse } from '../../shared/types/product';


const PAGE_LIMIT = 5;


export default function ProductsPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page') ?? '1');

    const sortBy = (searchParams.get('sortBy') as SortBy | null);
    const order = (searchParams.get('order') as SortOrder | null);

    const searchQueryFromUrl = searchParams.get('q') ?? '';
    const [searchInput, setSearchInput] = useState(searchQueryFromUrl);
    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        setSearchInput(searchQueryFromUrl);
    }, [searchQueryFromUrl]);

    const debouncedSearchInput = useDebouncedValue(searchInput, 400);

    useEffect(() => {
        setSearchParams((prevParams) => {
            const nextParams = new URLSearchParams(prevParams);
            nextParams.set('page', '1');

            const trimmedSearch = debouncedSearchInput.trim();

            if (trimmedSearch.length > 0) {
                nextParams.set('q', trimmedSearch);
            } else {
                nextParams.delete('q');
            }
            return nextParams;
        });
    }, [debouncedSearchInput, setSearchParams]);


    const sort: SortState =
        sortBy && order ? { sortBy, order } : null;


    const limit = PAGE_LIMIT;
    const skip = (page - 1) * limit;

    const queryClient = useQueryClient();

    const productQueryKey = ['products', {
        limit,
        skip,
        searchQuery: searchQueryFromUrl,
        sortBy,
        order
    }] as const;

    const { data, isError, isFetching, isLoading } = useQuery({
        queryKey: productQueryKey,
        queryFn: () => fetchProducts({
            limit,
            skip,
            sortBy: sort?.sortBy,
            order: sort?.order,
            searchQuery: searchQueryFromUrl
        }),
        placeholderData: keepPreviousData
    });

    const items = data?.products ?? [];

    const toggleSort = (next: SortBy) => {
        setSearchParams(prev => {
            const page = new URLSearchParams(prev);
            page.set('page', '1');

            const currentSortBy = page.get('sortBy') as SortBy | null;
            const currentOrder = page.get('order') as SortOrder | null;

            if (currentSortBy !== next) {
                page.set('sortBy', next);
                page.set('order', 'asc');
                return page;
            }

            if (currentOrder === 'asc') {
                page.set('sortBy', next);
                page.set('order', 'desc');
                return page;
            }

            page.delete('sortBy');
            page.delete('order');
            return page;
        });
    };

    const onRefreshButtonClick = () => {
        setSearchParams(prev => {
            const page = new URLSearchParams(prev);
            page.set('page', '1');
            page.delete('sortBy');
            page.delete('order');
            return page;
        });
    };

    const onCreateProductClick = (product: Product) => {
        queryClient.setQueryData<ProductsResponse>(productQueryKey, (prev) => {
            if (!prev) {
                return prev;
            }
            return {
                ...prev,
                total: prev.total + 1,
                products: [product, ...prev.products].slice(0, limit),
            };
        });
    };

    return (
        <main className={styles.products}>
            <ProductsHeader
                searchInput={searchInput}
                onSearchChange={setSearchInput}
            />
            <section className={styles.products__content} aria-label="Список товаров">
                <div className={styles.products__container}>
                    <div className={styles.products__titleWrapper}>
                        <h2 className={styles.products__title}>
                            Все позиции
                        </h2>
                        <div className={styles.products__buttons}>
                            <button className={styles.products__refreshButton}
                                type="button"
                                aria-label="Обновить список"
                                onClick={onRefreshButtonClick}
                            >
                                <RefreshIcon />
                            </button>
                            <button
                                className={styles.products__addButton}
                                type="button"
                                onClick={() => setIsAddOpen(true)}
                            >
                                <span className={styles.products__addButtonIconWrapper} aria-hidden="true">
                                    <PlusCircleIcon />
                                </span>
                                Добавить
                            </button>
                        </div>
                    </div>
                    {isFetching && <div className={styles.products__progress} />}
                    {isLoading && <div className={styles.products__state}>Загрузка...</div>}
                    {isError && <div className={styles.products__state}>Ошибка загрузки</div>}
                    <ProductsList
                        items={items}
                        sort={sort}
                        onSort={toggleSort}
                    />
                    <ProductsFooter />
                    <AddProductModal
                        isOpen={isAddOpen}
                        onClose={() => setIsAddOpen(false)}
                        onCreate={onCreateProductClick}
                    />
                </div>
            </section>
        </main>
    );
}

