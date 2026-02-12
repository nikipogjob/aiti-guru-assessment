import type { Product } from '../../shared/types/product';
import PlusCircleIcon from '../../shared/ui/icons/plus-circle-icon';
import RefreshIcon from '../../shared/ui/icons/refresh-icon';
import styles from './products-page.module.scss';
import ProductsFooter from './ui/products-footer/products-footer';
import ProductsHeader from './ui/products-header/products-header';
import ProductsList from './ui/products-list/products-list';


const MOCK: Product[] = [
    {
        id: 1,
        name: 'USB Флэшкарта 16GB',
        vendor: 'Samsung',
        sku: 'RCH45Q1A',
        rating: 4.3,
        category: 'beauty',
        price: 48652,
    },
    {
        id: 2,
        name: 'Утюг Braun TexStyle 9',
        vendor: 'TexStyle',
        sku: 'DFCHQ1A',
        rating: 4.9,
        category: 'fun',
        price: 4233,
    },
    {
        id: 3,
        name: 'Смартфон Apple iPhone 17',
        vendor: 'Apple',
        sku: 'GUYHD2-X4',
        rating: 4.7,
        category: 'sport',
        price: 88652,
        selected: true,
    },
    {
        id: 4,
        name: 'Игровая консоль PlaySta...',
        vendor: 'Sony',
        sku: 'HT45Q21',
        rating: 4.1,
        category: 'Lorem',
        price: 56236,
    },
    {
        id: 5,
        name: 'Фен Dyson Supersonic Nural',
        vendor: 'Dyson',
        sku: 'FJHHGF-CR4',
        rating: 3.3,
        category: 'Ipse',
        price: 48652,
    },
];


export default function ProductsPage() {

    return (
        <main>
            <ProductsHeader />
            <section className={styles.products__content} aria-label="Список товаров">
                <div className={styles.products__titleWrapper}>
                    <h2 className={styles.products__title}>
                        Все позиции
                    </h2>
                    <div className={styles.products__buttons}>

                        <button className={styles.products__iconButton} type="button" aria-label="Обновить список">
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
                <div className={styles.products__listHeader}>

                </div>
                <ProductsList items={MOCK} />
                <ProductsFooter />
            </section>
        </main>
    );
}

