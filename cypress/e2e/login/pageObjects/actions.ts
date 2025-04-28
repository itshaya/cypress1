export class LoginActions {

    static openWebsite() {
        cy.visit("/sign-in");
    }
    
    static fillLoginFields(username: string, password: string): void {
        cy.clearAndType('#username', username);
        cy.clearAndType('#password', password);
    }

    static clickLoginButton(): void {
        cy.contains('Login').click();
    }

}


