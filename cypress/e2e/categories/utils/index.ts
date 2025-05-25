import { Category, ColumnName, SortingType } from "../fixtures/data";
import { CategoriesAssertions } from "../pageObjects/assertions";

export const url = 'https://product-manager-1903f-default-rtdb.firebaseio.com/categories.json';
const deleteUrl = 'https://product-manager-1903f-default-rtdb.firebaseio.com/categories';

export const createCategory = (categories: Category[]) => {
  categories.forEach((category) => {
    cy.request('POST', url, category).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
};

export const generateTestCategory = (index: number, name?: string): Category => {
  const timestamp = Date.now();
  return {
    id: `test-category-id-${index}`,
    name: name ?? `testCategory-${index}`,
    description: 'new category',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const generateTestCategories = (count: number): Category[] => {
  return Array.from({ length: count }, (_,i) => generateTestCategory(i));
};


export const deleteTestedCategories = () => {
  cy.request('GET', url)
    .then((res) => {
      const data = res.body;
      for (const key in data) {
        const category = data[key];
        if (category.name?.includes('testCategory') || category.name?.startsWith('searchItem')) {
          cy.request('DELETE', `${deleteUrl}/${key}.json`);
        }
      }
    });
};
