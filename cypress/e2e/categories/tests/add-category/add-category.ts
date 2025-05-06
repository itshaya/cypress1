import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";

Given('The user is logged in', () => {
    cy.login();
});

Given('navigates to the Categories page', () => {
    CategoriesActions.openCategoriesPage();
});

When('user clicks the Add Category button', () => {
    CategoriesActions.clickAddCategoryButton();
});

Then('The form for adding a new category should open', () => {
    CategoriesAssertions.verifyVisibilityOfAddCategoryModal();
});

When('leaves the category name field empty and clicks submit', () => {
    CategoriesActions.clickSubmitButton();
});

Then('an error message should appear', () => {
    CategoriesAssertions.verifyVisibilityOfNameRequiredMessage();
});


When('fills in the category name and submits', () => {
    const name = 'TestCategory-' + Date.now();
    CategoriesActions.storeCategoryName(name);
    CategoriesActions.addNewCategory(name);
});

Then('the new category should appear in the categories list', () => {
    const name = CategoriesActions.getCategoryName();
    CategoriesActions.selectItemsPerPage(50);
    CategoriesActions.findCategoryAcrossPages(name);
    CategoriesAssertions.assertCategoryIsVisible(name);
});

When('the user successfully adds a new category', () => {
    const categoryName = 'TestCategory-' + Date.now();
    CategoriesActions.addNewCategory(categoryName);
});

Then('A success message should appear', () => {
    CategoriesAssertions.verifySuccessMessageVisibility();
});

When('the user tries to add a category with an existing name', () => {
    CategoriesActions.getExistingCategoryName((name) => {
        CategoriesActions.addNewCategory(name);
    });
});

Then('system should display a message indicating that the category name already exists', () => {
    CategoriesAssertions.verifyCategoryExistMessageVisibility();
});

let categoryIntercepted = false;
When('the user cancels the adding process', () => {
    CategoriesActions.cancelAddingProcess(categoryIntercepted);
});

Then('The category should not be added', () => {
    CategoriesAssertions.verifyCancellationProcessNotAdded(categoryIntercepted);
});