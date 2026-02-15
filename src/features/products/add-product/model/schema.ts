import { z } from 'zod';

export const addProductsSchema = z.object({
    title: z.string().min(1, 'Введите наименование'),
    price: z
        .number()
        .positive('Цена должна быть больше 0'),
    brand: z.string().min(1, 'Введите вендора'),
    sku: z.string().min(1, 'Введите артикул'),
    category: z.string().min(1, 'Введите категорию').optional(),
    rating: z.number().min(0, '0-5').max(5, '0-5').optional(),
});

export type AddProductsFormValues = z.infer<typeof addProductsSchema>;
