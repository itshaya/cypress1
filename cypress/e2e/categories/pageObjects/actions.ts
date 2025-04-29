export class CategoriesActions {

    static openCategoriesPage() {
        cy.visit('/categories');
    }

    static getTablesRows() {
        cy.get('tr.table-body-row').as('table-rows');
    }
}