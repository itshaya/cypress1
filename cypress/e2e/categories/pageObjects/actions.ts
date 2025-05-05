import { pushCreatedAt, resetCreatedAt } from "../utils";

export class CategoriesActions {

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

}