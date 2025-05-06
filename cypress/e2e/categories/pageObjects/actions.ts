import { pushCreatedAt, resetCreatedAt } from "../utils";

export class CategoriesActions {

    static existingCategoryName = ''

    static openCategoriesPage() {
        cy.visit('/categories');
    }

    static getTablesRows() {
        return cy.get('tr.table-body-row').as('table-rows');
    }

    static storeCurrentCreatedAtTimestamps(): void {
        resetCreatedAt();
        cy.get('tr.table-body-row').each(($row) => {
            cy.wrap($row)
                .find('td')
                .eq(1)
                .invoke('text')
                .then((text) => {
                    pushCreatedAt(text.trim());
                });
        });
    }

    static clickNextAndVerifyPageNumberIncreased(): void {
        cy.get('.table-controls__actions p').invoke('text').then((text) => {
            const pageNum = Number(text.trim());

            cy.contains('button', 'Next').click();

            cy.get('.table-controls__actions p').invoke('text').should((newText) => {
                const newPageNum = Number(newText.trim());
                expect(newPageNum).to.equal(pageNum + 1);
            });
        });
    }

    static selectItemsPerPage(num: number) {
        cy.get('#query').select(num.toString());
    }

    static changeViewPortToDevice() {
        cy.viewport('iphone-6');
    }

    static verifyTableShouldRemainReadable() {
        cy.get('table').should('be.visible');
        cy.get('table td').each(($el) => {
            cy.wrap($el).should('not.be.empty');
        });
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

    static clickSortButton(clickNum: number, columnNum: number) {
        if (clickNum === 1) {
            cy.get('.sort-btn').eq(columnNum).click();
        } else {
            cy.get('.sort-btn').eq(columnNum).click();
            cy.get('.sort-btn').eq(columnNum).click();
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

    static saveCategoryName(categoryName: string): string {
        let newName = categoryName;
        return newName;
    }
    static addNewCategory(newCategoryName: string) {
        cy.clearAndType('#name', newCategoryName);
        CategoriesActions.clickSubmitButton();
    }

    static storeCategoryName(name: string) {
        Cypress.env('categoryName', name);
    }

    static getCategoryName(): string {
        return Cypress.env('categoryName');
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
        }).as('addCategory');
        cy.get('button').contains('Cancel').click();
    }

}