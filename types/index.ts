export enum EntityStatus {
    NEW = 'NEW',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED'
}
export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export interface PaginationResponseDto<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}