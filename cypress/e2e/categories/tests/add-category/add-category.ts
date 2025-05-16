import { AfterAll, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";
import { createCategory, deleteTestedCategories, generateTestCategory } from "../../utils";

let typedName = ''
const categoryIntercepted = false;
let existingCategoryName: string;

beforeEach(() => {
    cy.login();
});

Given('user navigates to the Categories page', () => {
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
    typedName = 'testCategory' + Date.now();;
    CategoriesActions.addNewCategory(typedName);
});

Then('the new category should appear in the categories list', () => {
    CategoriesActions.selectItemsPerPage(50);
    CategoriesAssertions.assertCategoryIsVisible(typedName);
});

When('the user successfully adds a new category', () => {
    const categoryName = 'testCategory' + Date.now();
    CategoriesActions.addNewCategory(categoryName);
});

Then('A success message should appear', () => {
    CategoriesAssertions.verifySuccessMessageVisibility();
});

Given('there is a one category exist at least', () => {
    const category = generateTestCategory();
    existingCategoryName = category.name;
    createCategory([category]);
});

When('the user tries to add a category with an existing name', () => {
    CategoriesActions.addNewCategory(existingCategoryName);
});

Then('system should display a message indicating that the category name already exists', () => {
    CategoriesAssertions.verifyCategoryExistMessageVisibility();
});

When('the user cancels the adding process', () => {
    CategoriesActions.cancelAddingProcess(categoryIntercepted);
});

Then('The category should not be added', () => {
    CategoriesAssertions.verifyCancellationProcessNotAdded(categoryIntercepted);
});

AfterAll(() => {
    deleteTestedCategories();
});