import { AfterAll, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";
import { createCategory, deleteTestedCategories } from "../../utils";

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

let typedName = ''
When('fills in the category name and submits', () => {
    typedName = 'testCategory' + Date.now();;
    CategoriesActions.addNewCategory(typedName);
});

Then('the new category should appear in the categories list', () => {
    CategoriesActions.selectItemsPerPage(50);
    CategoriesActions.findCategoryAcrossPages(typedName);
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
    createCategory(1);
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

AfterAll(() => {
    deleteTestedCategories();
});