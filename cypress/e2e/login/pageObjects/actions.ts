 export class LoginActions {

    static fillLoginFields(username: string, password: string): void {
        cy.get('#username').clear().then($input => {
            if (username) cy.wrap($input).type(username);
        });

        cy.get('#password').clear().then($input => {
            if (password) cy.wrap($input).type(password);
        });
    }

    static clickLoginButton(): void {
        cy.contains('Login').click();
    }

}


