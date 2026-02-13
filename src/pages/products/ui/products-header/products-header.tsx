import SearchIcon from '../../../../shared/ui/icons/search-icon';
import styles from './products-header.module.scss';


export default function ProductsHeader() {
    return (
        <header className={styles.productsHeader}>
            <div className={styles.productsHeader__inner}>

                <h1 className={styles.productsHeader__title}>Товары</h1>
                <form className={styles.productsHeader__search} role="search" aria-label="Поиск товаров">
                    <SearchIcon className={styles.productsHeader__searchIcon} />
                    <input
                        className={styles.productsHeader__searchInput}
                        type="search"
                        placeholder="Найти"
                        aria-label="Найти"
                    />
                </form>
            </div>

        </header>
    );
}