export class LoginAssertions{
    static verifyRedirectionToCategoriesPage(){
        cy.url().should("include", "/categories");
    }

    static verifyStayInLoginPage(){
        cy.url().should('include', '/sign-in')
    }

    static verifyVisibilityValidationMessages(){
        cy.contains('Username is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');
        cy.url().should('include', '/sign-in')
    }
}