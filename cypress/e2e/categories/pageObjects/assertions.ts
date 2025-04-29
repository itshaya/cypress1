export class CategoriesAssertions {

    static verifyCreatedAtFormat() {
        const timeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        cy.get('@table-rows').each(($row) => {
            cy.wrap($row)
                .find('td')
                .eq(1)
                .invoke('text')
                .invoke('trim')
                .should('match', timeRegex);
        });
    }

}