import { EntityStatus, SortOrder } from '@/types'
import { parseAsString, parseAsInteger, parseAsStringEnum } from 'nuqs'

export const dishesFiltersClient = ({
    search: parseAsString.withDefault(''),
    status: parseAsStringEnum<EntityStatus>(Object.values(EntityStatus)).withDefault(EntityStatus.ACTIVE),
    // categoryId: parseAsString.withDefault(''),
    // minPrice: parseAsInteger.withDefault(0),
    // maxPrice: parseAsInteger.withDefault(1000000),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    sortBy: parseAsString.withDefault('created_at'),
    sortOrder: parseAsStringEnum<SortOrder>(Object.values(SortOrder)).withDefault(SortOrder.DESC),
})