export const fillLoginFields = (username: string, password: string) => {
    cy.get('#username').clear().then($input => {
        if (username) cy.wrap($input).type(username);
    });

    cy.get('#password').clear().then($input => {
        if (password) cy.wrap($input).type(password);
    });
};

export const clickLoginButton = () => {
    cy.contains('Login').click();
}


