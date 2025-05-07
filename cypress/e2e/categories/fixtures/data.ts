export interface Category {
    id: string;
    name: string;
    description?: string;
    createdAt: number;
    updatedAt: number;
}

export const testCategory: Category = {
    id: 'test-category-id-'+Date.now(),
    name: 'testCategory' + Date.now(),
    description: 'new category',
    createdAt: Date.now(),
    updatedAt: Date.now()
}

