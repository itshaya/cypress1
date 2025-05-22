export interface Category {
    id: string;
    name: string;
    description?: string;
    createdAt: number;
    updatedAt: number;
}

export type SortingType = "ascending" | 'descending';
export type ColumnName = "Name" | "CreatedAt";
