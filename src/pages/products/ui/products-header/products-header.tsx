import SearchIcon from '../../../../shared/ui/icons/search-icon';
import styles from './products-header.module.scss';


export default function ProductsHeader() {
    return (
        <header className={styles.products__header}>
            <h1 className={styles.products__headerTitle}>Товары</h1>

            <form className={styles.products__search} role="search" aria-label="Поиск товаров">
                <SearchIcon className={styles.products__searchIcon} />
                <input
                    className={styles.products__searchInput}
                    type="search"
                    placeholder="Найти"
                    aria-label="Найти"
                />
            </form>

        </header>
    );
}