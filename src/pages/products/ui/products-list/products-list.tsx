import type { Product, SortBy, SortState } from '../../../../shared/types/product';
import ProductsItem from '../products-item/products-item';
import styles from './products-list.module.scss';

type ProductsListProps = {
    items: Product[];
    sort: SortState;
    onSort: (sortBy: SortBy) => void;
};


export default function ProductsList({ items, onSort }: ProductsListProps) {
    return (
        <div className={styles.productsList}>
            <ul className={styles.productsList__list}>
                <li className={`${styles.productsList__listItem} ${styles['productsList__listItem--head']}`}>
                    <div className={styles.productsList__cell}>
                        <span className={styles.productsList__check} />
                    </div>

                    <div className={styles.productsList__cell}><span className={styles.productsList__headLabel}>Наименование</span></div>
                    <div className={styles.productsList__cell}><span className={styles.productsList__headLabel}>Вендор</span></div>
                    <div className={styles.productsList__cell}><span className={styles.productsList__headLabel}>Артикул</span></div>
                    <div className={styles.productsList__cell}><span className={`${styles.productsList__headLabel} ${styles['productsList__headLabel--active']}`} onClick={() => onSort('rating')}>Оценка</span></div>
                    <div className={styles.productsList__cell}><span className={`${styles.productsList__headLabel} ${styles['productsList__headLabel--active']}`} onClick={() => onSort('price')}>Цена, ₽</span></div>
                    <div className={styles.productsList__cell} />
                </li>
                {items.map((product) => (
                    <ProductsItem key={product.id} item={product} />
                ))}
            </ul>
        </div>
    );
}