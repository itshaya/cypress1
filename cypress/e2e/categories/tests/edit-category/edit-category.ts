import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";


Given('The user is logged in', () => {
    cy.login();
});

Given('navigates to the Categories page', () => {
    CategoriesActions.openCategoriesPage();
});

When('the table of categories is displayed', () => {
    CategoriesActions.displayTableCategories();
})

Then('Each category should have an edit button beside it', () => {
    CategoriesAssertions.verifyEachCategoryHasEditButton();
})

When('the user clicks the edit button for a category', () => {
    CategoriesActions.clickTheEditButton();
})

Then('a form should open prefilled with the category name', () => {
    CategoriesAssertions.verifyEditFormOpenWithPrefieldCategoryName();
})

When('the user edits the category and enters a new name', () => {
    CategoriesActions.editCategoryWithNewName();
})

Then('The category should appear with the updated name in the table', () => {
    CategoriesAssertions.verifyCategoryUpdatedSuccessfully();
})

When('the user attempts to edit a category name with an existing category name', () => {
    CategoriesActions.getExistingCategoryName((name) => {
        CategoriesActions.fillEditFormAndClick(name);
    });
})

Then('The system should prevent the edit and display a validation message', () => {
    CategoriesAssertions.verifyCategoryExistMessageVisibility();
})

let categoryIntercepted = false;
When('the user attempts to edit a category name and cancels the edit process', () => {
    CategoriesActions.cancelCategoryEdit(categoryIntercepted);
})

Then('the system should discard any changes and leave the category unchanged', () => {
    CategoriesAssertions.verifyCancellationProcessNotAdded(categoryIntercepted)
})