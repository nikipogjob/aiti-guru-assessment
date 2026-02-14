import { useSearchParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../shared/api/products';
import ProductsFooter from './ui/products-footer/products-footer';
import ProductsHeader from './ui/products-header/products-header';
import ProductsList from './ui/products-list/products-list';
import PlusCircleIcon from '../../shared/ui/icons/plus-circle-icon';
import RefreshIcon from '../../shared/ui/icons/refresh-icon';
import styles from './products-page.module.scss';
import type { SortBy, SortOrder, SortState } from '../../shared/types/product';


const PAGE_LIMIT = 5;


export default function ProductsPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page') ?? '1');
    const sortBy = (searchParams.get('sortBy') as SortBy | null);
    const order = (searchParams.get('order') as SortOrder | null);

    const sort: SortState =
        sortBy && order ? { sortBy, order } : null;


    const limit = PAGE_LIMIT;
    const skip = (page - 1) * limit;

    const { data, isError, isFetching, isLoading } = useQuery({
        queryKey: ['products', {
            limit,
            skip,
            sortBy: sort?.sortBy,
            order: sort?.order
        }],
        queryFn: () => fetchProducts({
            limit,
            skip,
            sortBy: sort?.sortBy,
            order: sort?.order
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

    return (
        <main className={styles.products}>
            <ProductsHeader />
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
                            <button className={styles.products__addButton} type="button">
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
                </div>
            </section>
        </main>
    );
}

