import { AfterAll, BeforeAll, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { createCategory, deleteTestedCategories, generateTestCategories, url } from "../../utils";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";

BeforeAll(() => {
    createCategory(generateTestCategories(3));
});

beforeEach(() => {
    cy.login();
});

Given('user navigates to the Categories page', () => {
    CategoriesActions.openCategoriesPage();
});

When('user clicks the delete button for a category', () => {
    CategoriesActions.clickDeleteCategoryButton();
});

Then('a confirmation modal should appear', () => {
    CategoriesAssertions.verifyDeleteModalVisible();
});

When('the user confirms the deletion', () => {
    CategoriesActions.deletesCategorySuccessfully();
})

Then('the category should be removed from the table', () => {
    CategoriesAssertions.verifyCategoryRemovedFromTable();
});

Then('a success message should be displayed', () => {
    CategoriesAssertions.verifySuccessMessageVisibility();
})

AfterAll(() => {
    deleteTestedCategories();
})