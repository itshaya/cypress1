declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(): Chainable<any>
        clearAndType(selector: string, value: string): Chainable<any>;
    }
}

Cypress.Commands.add('clearAndType', (selector, value) => {
    cy.get(selector).clear();
    if (value) {
        cy.get(selector).type(value);
    }
});

Cypress.Commands.add('login', () => {
    cy.visit('/sign-in');
    cy.clearAndType('#username', Cypress.env('USERNAME'));
    cy.clearAndType('#password', Cypress.env('PASSWORD'));
    cy.contains('Login').click();
});
