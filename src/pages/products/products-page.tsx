import { useState } from 'react';
import PlusCircleIcon from '../../shared/ui/icons/plus-circle-icon';
import RefreshIcon from '../../shared/ui/icons/refresh-icon';
import styles from './products-page.module.scss';
import ProductsFooter from './ui/products-footer/products-footer';
import ProductsHeader from './ui/products-header/products-header';
import ProductsList from './ui/products-list/products-list';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../shared/api/products';


const PAGE_LIMIT = 5;

export default function ProductsPage() {

    const [page, setPage] = useState(1);
    const limit = PAGE_LIMIT;
    const skip = (page - 1) * limit;

    const { data, isError, isFetching, isLoading, refetch } = useQuery({
        queryKey: ['products', { limit, skip }],
        queryFn: () => fetchProducts({ limit, skip }),
        placeholderData: keepPreviousData
    });

    const items = data?.products ?? [];

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
                                onClick={() => refetch()}
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
                    <ProductsList items={items} />
                    <ProductsFooter />
                </div>
            </section>
        </main>
    );
}

