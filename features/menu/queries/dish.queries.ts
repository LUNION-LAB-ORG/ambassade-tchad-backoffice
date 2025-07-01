import { api } from "@/lib/api-http";
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';

import { CreateDishDto, UpdateDishDto } from "../validations/dish.validations";
import { IDish, IDishSearchParams } from "../types/dish.types";

import { PaginationResponseDto } from "@/types";

export const DISHES_QUERY_KEY = ['dishes'] as const;

/**
 * Génère les options de requête pour obtenir la liste des plats.
 * @param dishSearchParams Paramètres de recherche des plats
 * @returns Options à utiliser avec `useQuery`
 */
export const getDishesListQueryOption = (dishSearchParams: IDishSearchParams) => {
    return {
        queryKey: [...DISHES_QUERY_KEY, 'list', dishSearchParams],
        queryFn: async (): Promise<PaginationResponseDto<IDish>> => {
            const response = await api.get<PaginationResponseDto<IDish>>('/dishes/search', { params: dishSearchParams });
            return response.data;
        },
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000, // 5 minutes
    }
};

/**
 * Hook pour récupérer une liste de plats avec paramètres de recherche.
 * @param dishSearchParams Paramètres de recherche
 * @returns Query result de `react-query`
 */
export const useDishesList = (dishSearchParams: IDishSearchParams) => {
    return useQuery(getDishesListQueryOption(dishSearchParams));
};


/**
 * Génère les options de requête pour pagination infinie de plats.
 * @param dishSearchParams Paramètres de recherche
 * @returns Options pour `useInfiniteQuery`
 */
export const getInfiniteDishesQueryOption = (dishSearchParams: IDishSearchParams) => {
    return {
        queryKey: [...DISHES_QUERY_KEY, 'list', dishSearchParams],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await api.get<PaginationResponseDto<IDish>>('/dishes/search', {
                params: { ...dishSearchParams, page: pageParam, limit: 10 }
            });
            return response.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: any, allPages: any[]) => {
            return lastPage.hasNextPage ? allPages.length + 1 : undefined;
        },
    }
};

/**
 * Hook pour récupération paginée et infinie de plats.
 * @param dishSearchParams Paramètres de recherche
 * @returns Infinite query result
 */
export const useInfiniteDishes = (dishSearchParams: IDishSearchParams) => {
    return useInfiniteQuery(getInfiniteDishesQueryOption(dishSearchParams));
};

/**
 * Génère les options de requête pour obtenir le détail d'un plat.
 * @param id ID du plat
 * @returns Options à utiliser avec `useQuery`
 */
export const getDishesDetailQueryOption = (id: string) => {
    return {
        queryKey: [...DISHES_QUERY_KEY, 'detail', id],
        queryFn: async (): Promise<IDish> => {
            const response = await api.get<IDish>(`/dishes/${id}`);
            return response.data;
        },
        enabled: !!id,
    }
};

/**
 * Hook pour récupérer le détail d'un plat.
 * @param id ID du plat
 * @returns Query result de `react-query`
 */
export const useDishesDetail = (id: string) => {
    return useQuery(getDishesDetailQueryOption(id));
};


/**
 * Hook pour créer un nouveau plat.
 * @returns Mutation result
 */
export const useCreateDish = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateDishDto): Promise<IDish> => {
            const response = await api.post<IDish>('/dishes', data);
            return response.data;
        },
        onSuccess: (newDish) => {
            // Invalide la liste des plats pour mise à jour
            queryClient.invalidateQueries({ queryKey: [...DISHES_QUERY_KEY, 'list'] });

            // Met à jour le cache du détail du plat
            queryClient.setQueryData(
                [...DISHES_QUERY_KEY, 'detail', newDish.id],
                newDish
            );
        },
    });
};

/**
 * Hook pour mettre à jour un plat existant.
 * @returns Mutation result
 */
export const useUpdateDish = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...data }: UpdateDishDto & { id: string }): Promise<IDish> => {
            const response = await api.patch<IDish>(`/dishes/${id}`, data);
            return response.data;
        },
        onSuccess: (updatedDish) => {
            // Met à jour le cache du détail
            queryClient.setQueryData(
                [...DISHES_QUERY_KEY, 'detail', updatedDish.id],
                updatedDish
            );

            // Invalide la liste des plats
            queryClient.invalidateQueries({ queryKey: [...DISHES_QUERY_KEY, 'list'] });
        },
    });
};

/**
 * Hook pour supprimer un plat.
 * @returns Mutation result
 */
export const useDeleteDish = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<void> => {
            await api.delete(`/dishes/${id}`);
        },
        onSuccess: (_, deletedId) => {
            // Supprime le cache du détail
            queryClient.removeQueries({ queryKey: [...DISHES_QUERY_KEY, 'detail', deletedId] });

            // Invalide les listes (simple et infinie)
            queryClient.invalidateQueries({ queryKey: [...DISHES_QUERY_KEY, 'list'] });
            queryClient.invalidateQueries({ queryKey: [...DISHES_QUERY_KEY, 'infinite'] });
        },
    });
};