import { When, Then, BeforeAll, AfterAll } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";
import { createCategory, deleteTestedCategories, generateTestCategories, generateTestCategory } from "../../utils";

const updatedName = 'updated-category' + Date.now();
const categoryIntercepted = false;
const existingCategory = generateTestCategory(0);

BeforeAll(() => {
    createCategory(generateTestCategories(3));
    createCategory([existingCategory]);
});

beforeEach(() => {
    cy.login();
});

When('the table of categories is displayed', () => {
    CategoriesActions.displayTableCategories();
})

When('the user clicks the edit button for a category', () => {
    CategoriesActions.clickTheEditButton();
})

When('the user edits the category and enters a new name', () => {
    CategoriesActions.fillEditFormAndClick(updatedName);
})

When('the user attempts to edit a category name with an existing category name', () => {
    CategoriesActions.fillEditFormAndClick(existingCategory.name);
})

When('the user attempts to edit a category name and cancels the edit process', () => {
    CategoriesActions.cancelCategoryEdit(categoryIntercepted);
})

Then('Each category should have an edit button beside it', () => {
    CategoriesAssertions.verifyEachCategoryHasEditButton();
})

Then('a form should open prefilled with the category name', () => {
    CategoriesAssertions.verifyEditFormOpenWithPrefilledCategoryName();
})

Then('The category should appear with the updated name in the table', () => {
    CategoriesAssertions.verifyCategoryUpdatedSuccessfully(updatedName);
})

Then('The system should prevent the edit and display a validation message', () => {
    CategoriesAssertions.verifyCategoryExistMessageVisibility();
})

Then('the system should discard any changes and leave the category unchanged', () => {
    CategoriesAssertions.verifyCancellationProcessNotAdded(categoryIntercepted)
})

AfterAll(() => {
    deleteTestedCategories();
});