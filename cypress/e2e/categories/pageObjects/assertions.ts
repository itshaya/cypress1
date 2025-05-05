import { currentCreatedAt } from "../utils";
export class CategoriesAssertions {

    static verifyCreatedAtFormat() {
        const timeRegex = /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/;
        cy.get('@table-rows').each(($row) => {
            cy.wrap($row)
                .find('td')
                .eq(1)
                .invoke('text')
                .invoke('trim')
                .should('match', timeRegex);
        });
    }

    static verifyNewPageHasDifferentCategories(): void {
        cy.get('tr.table-body-row').each(($row) => {
            cy.wrap($row)
                .find('td')
                .eq(1)
                .invoke('text')
                .then((newCreatedAt) => {
                    expect(currentCreatedAt).to.not.include(newCreatedAt.trim());
                });
        });
    }

    static assertItemsPerPageDisplayed(num: number) {
        cy.get('.table-body')
            .children()
            .should('have.length.at.most', num);
    }

    static verifyNextButtonDisabled() {
        cy.get('button').contains('Next').should('be.disabled');
    }

    static verifyPreviousButtonDisabled() {
        cy.get('button').contains('Previous').should('be.disabled');
    }


}