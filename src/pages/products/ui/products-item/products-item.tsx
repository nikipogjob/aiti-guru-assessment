import type { Product } from '../../../../shared/types/product';
import PlusIcon from '../../../../shared/ui/icons/plus-icon';
import ThreeDotsIcon from '../../../../shared/ui/icons/three-dots-icon';
import styles from './products-item.module.scss';

type ProductsItemProps = {
    item: Product;
};

export default function ProductsItem({ item }: ProductsItemProps) {
    return (
        <li className={styles.productsItem}>
            <div className={styles.productItem__cell}>
                <span className={styles.productsItem__check} aria-hidden="true" />
            </div>
            <div className={styles.productItem__cell}>
                <div className={styles.productsItem__nameCell}>
                    <span className={styles.productsItem__thumb} aria-hidden="true" />
                    <div className={styles.productItem__nameText}>
                        <div className={styles.productItem__name}>{item.name}</div>
                        <div className={styles.productItem__category}>{item.category}</div>
                    </div>
                </div>
            </div>
            <div className={styles.productItem__cell}>
                {item.vendor}
            </div>
            <div className={styles.productItem__cell}>
                {item.sku}
            </div>
            <div className={styles.productItem__cell}>
                {item.rating.toFixed(1)}/5
            </div>
            <div className={styles.productItem__cell}>
                {item.price}
            </div>
            <div className={styles.productsItem__cell}>
                <div className={styles.productsItem__actions}>
                    <button className={styles.productsItem__pillButton} type="button">
                        <PlusIcon />
                    </button>
                    <button className={styles.productItem__dotsButton} type="button">
                        <ThreeDotsIcon />
                    </button>
                </div>
            </div>

        </li>
    );
}