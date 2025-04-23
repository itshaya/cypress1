const login = (username: string, password: string) => {
    cy.get('#username ').type(username);
    cy.get('#password ').type(password);
    cy.contains('Login').click();
};

export default login; 
