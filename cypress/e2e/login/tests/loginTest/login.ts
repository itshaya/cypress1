import { emptyUserFields, invalidUser, validUser } from "../../fixtures/data";
import { fillLoginFields, clickLoginButton } from "../../pageObjects/actions";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("I open the login page", () => {
    cy.visit("/sign-in");
});

// successfully login 
When("I enter valid credentials", () => {
    fillLoginFields(validUser.username, validUser.password);
});

When("I click the login button", () => {
    clickLoginButton();
})

Then("I should be redirected to the categories page", () => {
    cy.url().should("include", "/categories");
});

// login with invalid credentials 

When('I fill fields with invalid credentials', () => {
    fillLoginFields(invalidUser.username, invalidUser.password);
});

Then('The login should fail and I should not be redirected to the categories page', () => {
    cy.url().should('include', '/sign-in')
})

// login with empty fields  

When('I try to leave the login fields empty', () => {
    fillLoginFields(emptyUserFields.password, emptyUserFields.password);
})

Then('The login should fail and see validation error messages', () => {
    cy.contains('Username is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
    cy.url().should('include', '/sign-in')
})



