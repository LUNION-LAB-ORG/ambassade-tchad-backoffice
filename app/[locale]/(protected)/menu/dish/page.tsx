import { Suspense } from "react";
import { Metadata } from "next";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { IDishSearchParams } from "@/features/menu/types/dish.types";
import getQueryClient from "@/lib/get-query-client";
import { getDishesListQueryOption } from "@/features/menu/queries/dish.queries";
import { dishesFiltersServer } from "@/features/menu/filters/dish.filters-server";
import DishTable from "@/components/features/menu/dish/dish-table";
import { DishTableSkeleton } from "@/components/features/menu/dish/dish-table-skeleton";

interface DishPageProps {
    searchParams: Promise<IDishSearchParams>;
}

export async function generateMetadata({ searchParams }: DishPageProps): Promise<Metadata> {
    const { search } = await searchParams;
    return {
        title: search ? `Dishes - Recherche: "${search}"` : 'Gestion des plats',
        description: 'Interface de gestion des plats avec filtres, recherche et pagination.',
    };
}


export default async function DishPage({ searchParams }: DishPageProps) {

    // Récupère le client de requête
    const queryClient = getQueryClient();

    // Parse les paramètres de recherche
    const dishFilters = await dishesFiltersServer.parse(searchParams);
console.log(dishFilters)
    // Précharge la requête de la liste des plats avec les paramètres de recherche
    await queryClient.prefetchQuery(
        getDishesListQueryOption(dishFilters)
    );

    return (
        <div>
            <SiteBreadcrumb />
            <div className="text-2xl font-medium">Dishes</div>
            <Suspense fallback={<DishTableSkeleton />}>
                <DishTable />
            </Suspense>
        </div>
    );
}