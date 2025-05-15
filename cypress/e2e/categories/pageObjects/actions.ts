import { ColumnName, SortingType } from "../fixtures/data";

export class CategoriesActions {

    private static clickEditButton() {
        cy.get('.table-body tr').eq(0).find('td').eq(2).as('actions');
        cy.get('@actions').find('button').eq(1).click();
    }

    static openCategoriesPage() {
        cy.visit('/categories');
    }

    static getTablesRows() {
        return cy.get('tr.table-body-row').as('table-rows');
    }

    static storeCurrentNames(names: string[]) {
        cy.get('tr.table-body-row').each(($row) => {
            cy.wrap($row)
                .find('td')
                .eq(0)
                .invoke('text')
                .then((text) => {
                    names.push(text.trim());
                });
        }).then(() => names);
    }

    static clickNextButton(): void {
        cy.get('button').contains('Next').click();
    }

    static selectItemsPerPage(num: number) {
        cy.get('#query').select(num.toString(), { force: true });
    }

    static changeViewPortToDevice() {
        cy.viewport('iphone-6');
    }


    static clickUntilDisabled() {
        cy.get('button').contains('Next').then(($btn) => {
            if (!$btn.prop('disabled')) {
                cy.wrap($btn).click();
                CategoriesActions.clickUntilDisabled();
            }
        });
    }

    static clickAddCategoryButton() {
        cy.get('button').contains('Add Category').click();
    }

    static clickSortButton(columnName: ColumnName, sortType: SortingType) {
        const columnIndex = columnName === "Name" ? 0 : 1;
        cy.get('.sort-btn').eq(columnIndex).click();
        if (sortType === "ascending") {
            cy.get('.sort-btn').eq(columnIndex).click();
        }
    }

    static typeInSearchField(searchTerm: string) {
        cy.get('#search').clear().type(searchTerm);
    }

    static findCategoryAcrossPages(categoryName: string) {
        cy.wait(1000);
        const checkCategory = () => {
            cy.get('tbody.table-body td').then(($tds) => {
                const found = [...$tds].some(td => td.innerText.trim() === categoryName);
                if (found) {
                    cy.log(`Category "${categoryName}" found.`);
                    return;
                }

                cy.get('button').contains('Next').then($btn => {
                    if (!$btn.is(':disabled')) {
                        cy.wrap($btn).click();
                        cy.wait(500);
                        checkCategory();
                    } else {
                        throw new Error(`Category "${categoryName}" not found in any page.`);
                    }
                });
            });
        };

        checkCategory();

    }

    static clickSubmitButton() {
        cy.get('button').contains('Submit').click();
    }

    static addNewCategory(newCategoryName: string) {
        cy.clearAndType('#name', newCategoryName);
        this.clickSubmitButton();
    }

    static getExistingCategoryName(callback: (name: string) => void): void {
        cy.get('table tr')
            .eq(1)
            .find('td')
            .eq(0)
            .invoke('text')
            .then((text) => {
                const name = text.trim();
                callback(name);
            });
    }

    static cancelAddingProcess(categoryIntercepted: boolean) {
        cy.intercept('POST', '**/categories', (req) => {
            categoryIntercepted = true;
        });
        cy.get('button').contains('Cancel').click();
    }

    static displayTableCategories() {
        cy.wait(500);
        cy.get('table').should('be.visible');
    }

    static clickTheEditButton() {
        cy.get('.table-body tr').eq(0).find('td').as('firstRow').eq(0)
            .invoke('text')
            .then((text) => {
                const categoryName = text.trim();
                cy.wrap(categoryName).as('expectedCategoryName');
            });
        cy.get('@firstRow').eq(2).find('button').eq(1).click();
    }

    static fillEditFormAndClick(name: string) {
        this.clickEditButton();
        cy.clearAndType('#name', name);
        cy.get('button').contains('Submit').click();
    }

    static editCategoryWithNewName() {
        const editedName = 'updated-category' + Date.now();
        cy.wrap(editedName).as("newName");
        this.fillEditFormAndClick(editedName);
    }

    static cancelCategoryEdit(categoryIntercepted: boolean) {
        this.clickEditButton();
        cy.intercept('PUT', '**/categories', (req) => {
            categoryIntercepted = true;
        }).as('editCategory');
        cy.get('button').contains('Cancel').click();
    }

    static clickDeleteCategoryButton() {
        cy.get('.table-body tr').eq(0).find('td').as('firstRow')
        cy.get('@firstRow').eq(2).find('button').eq(0).click();
    }

    static deletesCategorySuccessfully() {
        cy.get('.table-body tr').eq(0).find('td').as('firstRow').eq(0)
            .invoke('text')
            .then((text) => {
                const deletedName = text.trim();
                cy.wrap(deletedName).as('deletedName')
            });
        cy.get('button').contains('Submit').click();
        cy.wait(500);
    }


}