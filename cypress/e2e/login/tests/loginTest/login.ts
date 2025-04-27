import { emptyUserFields, invalidUser, validUser } from "../../fixtures/data";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginActions } from "../../pageObjects/actions";
import { LoginAssertions } from "../../pageObjects/assertions";


Given("I open the login page", () => {
    cy.visit("/sign-in");
});

// successfully login 
When("I enter valid credentials", () => {
    LoginActions.fillLoginFields(validUser.username, validUser.password);
});

When("I click the login button", () => {
    LoginActions.clickLoginButton();
})

Then("I should be redirected to the categories page", () => {
    LoginAssertions.verifyRedirectionToCategoriesPage();
});

// login with invalid credentials 

When('I fill fields with invalid credentials', () => {
    LoginActions.fillLoginFields(invalidUser.username, invalidUser.password);
});

Then('The login should fail and I should not be redirected to the categories page', () => {
    LoginAssertions.verifyStayInLoginPage();
})

// login with empty fields  

When('I try to leave the login fields empty', () => {
    LoginActions.fillLoginFields(emptyUserFields.password, emptyUserFields.password);
})

Then('The login should fail and see validation error messages', () => {
   LoginAssertions.verifyVisibilityValidationMessages();
})



