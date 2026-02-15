import styles from './products-footer.module.scss';


export default function ProductsFooter() {
    return (
        <footer className={styles.products__footer}>
            <div className={styles.products__meta}>
                Показано 1-20 из 120
            </div>
            <nav className={styles.products__pagination} aria-label="Пагинация">
                <button className={styles.products__pageArrow} type="button" aria-label="Предыдущая страница">
                    &lt;
                </button>
                <button className={`${styles.products__page} ${styles['products__page--active']}`} type="button">
                    1
                </button>
                <button className={styles.products__page} type="button">
                    2
                </button>
                <button className={styles.products__page} type="button">
                    3
                </button>
                <button className={styles.products__page} type="button">
                    4
                </button>
                <button className={styles.products__page} type="button">
                    5
                </button>
                <button className={styles.products__pageArrow} type="button" aria-label="Следующая страница">
                    &gt;
                </button>
            </nav>

        </footer>
    );
}