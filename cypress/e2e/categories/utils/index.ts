import { Category } from "../fixtures/data";

export let currentCreatedAt: string[] = [];

export function resetCreatedAt() {
    currentCreatedAt = [];
}

export function pushCreatedAt(timestamp: string) {
    currentCreatedAt.push(timestamp);
}

export function createTestCategory(testCategory: Category) {
    const timestamp = Date.now();

    return cy.request({
        method: "POST",
        url: "https://product-manager-1903f-default-rtdb.firebaseio.com/categories.json",
        body: {
            id: testCategory.id ,
            name: testCategory.name,
            description: testCategory.description || " ",
            createdAt: timestamp,
            updateAt: timestamp
        }
    });
}