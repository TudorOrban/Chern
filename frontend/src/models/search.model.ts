
export interface SearchParams {
    searchQuery: string;
    sortBy: string;
    isDescending: boolean;
    page: number;
    itemsPerPage: number;
}

export interface PaginatedResults<T> {
    results: T[];
    totalCount: number;
}