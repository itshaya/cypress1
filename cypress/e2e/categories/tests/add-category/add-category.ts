import { AfterAll, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";
import { createCategory, deleteTestedCategories, generateTestCategory } from "../../utils";

const typedName = 'testCategory' + Date.now();
const categoryIntercepted = false;
const existingCategoryName = 'testCategory' + Date.now();

beforeEach(() => {
    cy.login();
});

Given('there is a one category exist at least', () => {
    const category = generateTestCategory(0);
    category.name = existingCategoryName;
    createCategory([category]);
});

When('user clicks the Add Category button', () => { 
    CategoriesActions.clickAddCategoryButton();
});

When('leaves the category name field empty and clicks submit', () => {
    CategoriesActions.clickSubmitButton();
});

When('fills in the category name and submits', () => {
    CategoriesActions.addNewCategory(typedName);
});

When('the user tries to add a category with an existing name', () => {
    CategoriesActions.addNewCategory(existingCategoryName);
});

When('the user cancels the adding process', () => {
    CategoriesActions.cancelAddingProcess(categoryIntercepted);
});

Then('The form for adding a new category should open', () => {
    CategoriesAssertions.verifyVisibilityOfAddCategoryModal();
});

Then('an error message should appear', () => {
    CategoriesAssertions.verifyVisibilityOfNameRequiredMessage();
});

Then('the new category should appear in the categories list', () => {
    CategoriesActions.selectItemsPerPage(50);
    CategoriesAssertions.assertCategoryIsVisible(typedName);
});

Then('A success message should appear', () => {
    CategoriesAssertions.verifySuccessMessageVisibility();
});

Then('system should display a message indicating that the category name already exists', () => {
    CategoriesAssertions.verifyCategoryExistMessageVisibility();
});

Then('The category should not be added', () => {
    CategoriesAssertions.verifyCancellationProcessNotAdded(categoryIntercepted);
});

AfterAll(() => {
    deleteTestedCategories();
});