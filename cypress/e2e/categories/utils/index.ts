import {testCategory } from "../fixtures/data";

const postUrl = 'https://product-manager-1903f-default-rtdb.firebaseio.com/categories.json';
const deleteUrl = 'https://product-manager-1903f-default-rtdb.firebaseio.com/categories';

export const createCategory = (num: number) => {
    while (num) {
        cy.request('POST', postUrl, testCategory)
            .then((response) => {
                expect(response.status).to.eq(200);
                cy.log('new category created' + testCategory.name);
            });
        num--;
    }
}

export const deleteAllTestedCategories = () => {
    cy.request('GET', `${postUrl}`)
    .then((res) => {
      const data = res.body;
      for (const key in data) {
        const category = data[key];
        if (category.name?.includes('testCategory')) {
          cy.request('DELETE', `${deleteUrl}/${key}.json`);
        }
      }
    });
  };
  