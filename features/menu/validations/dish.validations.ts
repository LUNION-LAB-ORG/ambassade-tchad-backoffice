import { z } from 'zod';

export const createDishSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    description: z.string().min(2, 'La description doit contenir au moins 2 caractères'),
    price: z.number().nonnegative("Le prix doit être positif"),
    is_promotion: z.boolean(),
    promotion_price: z.number().nonnegative("Le prix de promotion doit être positif"),
    category_id: z.string().min(1),
    restaurant_ids: z.array(z.string().min(1)),
    supplement_ids: z.array(z.string().min(1)),
});

export type CreateDishDto = z.infer<typeof createDishSchema>;


export const updateDishSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().nonnegative().optional(),
    is_promotion: z.boolean().optional(),
    promotion_price: z.number().nonnegative().optional(),
    category_id: z.string().min(1).optional(),
    restaurant_ids: z.array(z.string().min(1)).optional(),
    supplement_ids: z.array(z.string().min(1)).optional(),
});

export type UpdateDishDto = z.infer<typeof updateDishSchema>;