export interface PageResponse<T> {
    contents: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

export interface Role {
    id: number;
    created: string;
    lastUpdate: string;
    name: string;
    description: string;
    isSystem: boolean;
}