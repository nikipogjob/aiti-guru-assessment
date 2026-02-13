import type { Product } from '../../../../shared/types/product';
import PlusIcon from '../../../../shared/ui/icons/plus-icon';
import ThreeDotsIcon from '../../../../shared/ui/icons/three-dots-icon';
import styles from './products-item.module.scss';

type ProductsItemProps = {
    item: Product;
};

export default function ProductsItem({ item }: ProductsItemProps) {

    const price = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.price);

    return (
        <li
            className={`${styles.productsItem} ${item.selected ? styles['productsItem--selected'] : ''
                }`}
        >
            <div className={styles.productsItem__cell}>
                <span className={`${styles.productsItem__check} ${item.selected ? styles['productsItem__check--selected'] : ''}`} aria-hidden="true" />
            </div>
            <div className={styles.productsItem__cell}>
                <div className={styles.productsItem__nameCell}>
                    <span className={styles.productsItem__thumb} aria-hidden="true" />
                    <div className={styles.productsItem__nameText}>
                        <div className={styles.productsItem__name}>{item.name}</div>
                        <div className={styles.productsItem__category}>{item.category}</div>
                    </div>
                </div>
            </div>
            <div className={styles.productsItem__cell}>
                {item.vendor}
            </div>
            <div className={styles.productsItem__cell}>
                {item.sku}
            </div>
            <div className={styles.productsItem__cell}>
                {item.rating.toFixed(1)}/5
            </div>
            <div className={`${styles.productsItem__cell} ${styles['productsItem__cell--price']}`}>
                {price}
            </div>
            <div className={styles.productsItem__cell}>
                <div className={styles.productsItem__actions}>
                    <button className={styles.productsItem__pillButton} type="button">
                        <PlusIcon />
                    </button>
                    <button className={styles.productsItem__dotsButton} type="button">
                        <ThreeDotsIcon />
                    </button>
                </div>
            </div>

        </li>
    );
}