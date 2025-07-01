import { EntityStatus, SortOrder } from '@/types'
import { parseAsString, parseAsInteger, parseAsStringEnum, createSearchParamsCache } from 'nuqs/server'

export const dishesFiltersServer = createSearchParamsCache({
    search: parseAsString.withDefault(''),
    status: parseAsStringEnum<EntityStatus>(Object.values(EntityStatus)).withDefault(EntityStatus.ACTIVE),
    // categoryId: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    // minPrice: parseAsInteger.withDefault(0).withOptions({ clearOnDefault: true }),
    // maxPrice: parseAsInteger.withDefault(1000000).withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
    limit: parseAsInteger.withDefault(10).withOptions({ clearOnDefault: true }),
    sortBy: parseAsString.withDefault('created_at').withOptions({ clearOnDefault: true }),
    sortOrder: parseAsStringEnum<SortOrder>(Object.values(SortOrder)).withDefault(SortOrder.DESC).withOptions({ clearOnDefault: true }),
})