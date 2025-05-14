import { AfterAll, BeforeAll, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";
import { createCategory, deleteTestedCategories, generateTestCategories, verifySortedColumn } from "../../utils";
import { ColumnName, SortingType } from "../../fixtures/data";

BeforeAll(() => {
    createCategory(generateTestCategories(5));
});

beforeEach(() => {
    cy.login();
});

Given('user navigates to the Categories page', () => {
    CategoriesActions.openCategoriesPage();
})


When('the user sorts the {string} column in {word} order', (columnName: ColumnName, sortType: SortingType) => {
    CategoriesActions.clickSortButton(columnName, sortType);
});

Then('categories should be displayed in {word} order according to {string}', (sortType: SortingType, columnName: ColumnName) => {
    verifySortedColumn(columnName, sortType);
});

When('The user enters {string} in the search field', (searchTerm: string) => {
    CategoriesActions.typeInSearchField(searchTerm);
});

Then('Only categories with names including {string} should be displayed', (searchTerm: string) => {
    CategoriesAssertions.verifyCategoriesWithNameDisplayed(searchTerm);
});

AfterAll(() => {
    deleteTestedCategories();
})