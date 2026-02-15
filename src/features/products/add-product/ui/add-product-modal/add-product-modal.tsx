import { useForm } from 'react-hook-form';
import type { Product } from '../../../../../shared/types/product';
import { addProductsSchema } from '../../model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Modal from '../../../../../shared/ui/modal/modal';
import styles from './add-product-modal.module.scss';
import type { AddProductsFormValues } from '../../model/schema';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (product: Product) => void;
}

export default function AddProductModal({ isOpen, onClose, onCreate }: AddProductModalProps) {

    const id = -crypto.getRandomValues(new Uint32Array(1))[0];

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AddProductsFormValues>({
        resolver: zodResolver(addProductsSchema),
        defaultValues: { title: '', price: 0, brand: '', sku: '', category: '', rating: 0 }
    });

    const onSubmit = (values: AddProductsFormValues) => {
        const newProduct: Product = {
            id,
            title: values.title,
            price: values.price,
            brand: values.brand,
            sku: values.sku,
            category: values.category?.trim() || '',
            rating: values.rating ?? 0,
        };

        onCreate(newProduct);
        toast.success('Товар добавлен');
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            title="Добавить товар"
            onClose={onClose}
        >
            <form
                className={styles.addProduct}
                onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.addProduct__field}>
                    <label className={styles.addProduct__label}>Наименование</label>
                    <input className={styles.addProduct__input} {...register('title')} />
                    {errors.title && <p className={styles.addProduct__error}>{errors.title.message}</p>}
                </div>
                <div className={styles.addProduct__field}>
                    <label className={styles.addProduct__label}>Вендор</label>
                    <input className={styles.addProduct__input} {...register('brand')} />
                    {errors.brand && <p className={styles.addProduct__error}>{errors.brand.message}</p>}
                </div>
                <div className={styles.addProduct__field}>
                    <label className={styles.addProduct__label}>Цена</label>
                    <input
                        className={styles.addProduct__input}
                        type="number"
                        step="1"
                        {...register('price', { valueAsNumber: true })} />
                    {errors.price && <p className={styles.addProduct__error}>{errors.price.message}</p>}
                </div>
                <div className={styles.addProduct__field}>
                    <label className={styles.addProduct__label}>Артикул</label>
                    <input className={styles.addProduct__input} {...register('sku')} />
                    {errors.sku && <p className={styles.addProduct__error}>{errors.sku.message}</p>}
                </div>
                <div className={styles.addProduct__field}>
                    <label className={styles.addProduct__label}>Категория</label>
                    <input className={styles.addProduct__input} {...register('category')} />
                    {errors.category && <p className={styles.addProduct__error}>{errors.category.message}</p>}
                </div>
                <div className={styles.addProduct__field}>
                    <label className={styles.addProduct__label}>Рейтинг</label>
                    <input
                        className={styles.addProduct__input}
                        type="number"
                        step={0.1}
                        min={1}
                        max={5}
                        {...register('rating', { valueAsNumber: true })}
                    />
                    {errors.rating && <p className={styles.addProduct__error}>{errors.rating.message}</p>}
                </div>
                <div className={styles.addProduct__actions}>
                    <button
                        className={styles.addProduct__cancel}
                        type="button"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                    <button
                        className={styles.addProduct__submit}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Добавить
                    </button>
                </div>
            </form>
        </Modal>
    );
}