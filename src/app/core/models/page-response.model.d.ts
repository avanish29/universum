declare interface PageResponse<T> {
    contents: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}