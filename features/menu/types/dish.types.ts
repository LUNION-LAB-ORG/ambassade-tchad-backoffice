import { EntityStatus } from "@/types";
import { ICategory } from "./category.types";

export interface IDish {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    is_promotion: boolean;
    promotion_price: number;
    category_id: string;
    entity_status: EntityStatus;
    created_at: string;
    updated_at: string;
    category: ICategory;
    dish_restaurants: any[];
    dish_supplements: any[];
}


export interface IDishSearchParams {
    /** Rechercher un plat par son nom ou description */
    search?: string;

    /** Filtrer par statut de plat */
    status?: EntityStatus;

    /** Filtrer par ID de catégorie */
    categoryId?: string;

    /** Montant minimum du plat */
    minPrice?: number;

    /** Montant maximum du plat */
    maxPrice?: number;

    /** Numéro de page (par défaut : 1) */
    page?: number;

    /** Nombre d'éléments par page (par défaut : 10) */
    limit?: number;

    /** Champ de tri (par défaut : "created_at") */
    sortBy?: string;

    /** Ordre de tri (par défaut : "desc") */
    sortOrder?: 'asc' | 'desc';
}
