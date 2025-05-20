import { AfterAll, BeforeAll, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { createCategory, deleteTestedCategories, generateTestCategories, url } from "../../utils";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";

BeforeAll(() => {
    createCategory(generateTestCategories(1));
});

beforeEach(() => {
    cy.login();
});

When('user clicks the delete button for a category', () => {
    CategoriesActions.clickDeleteCategoryButton();
});

When('the user confirms the deletion', () => {
    CategoriesActions.deletesCategorySuccessfully();
})

Then('a confirmation modal should appear', () => {
    CategoriesAssertions.verifyDeleteModalVisible();
});

Then('the category should be removed from the table', () => {
    CategoriesAssertions.verifyCategoryRemovedFromTable();
});

Then('a success message should be displayed', () => {
    CategoriesAssertions.verifySuccessMessageVisibility();
})

AfterAll(() => {
    deleteTestedCategories();
})