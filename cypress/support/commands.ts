declare namespace Cypress {
    interface Chainable<Subject = any> {
        clearAndType(selector: string, value: string): Chainable<any>;
    }
}

Cypress.Commands.add('clearAndType', (selector, value) => {
    cy.get(selector).clear();
    if (value) {
        cy.get(selector).type(value);
    }
});
