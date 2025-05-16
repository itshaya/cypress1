import { AfterAll, BeforeAll, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";
import { createCategory, deleteTestedCategories, generateTestCategories, generateTestCategory, verifySortedColumn } from "../../utils";
import { ColumnName, SortingType } from "../../fixtures/data";

const searchTerm = 'searchItem' + Date.now();

BeforeAll(() => {
    createCategory(generateTestCategories(5));
    createCategory([generateTestCategory(searchTerm)]);
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

When('The user enters name in the search field', () => {
    CategoriesActions.typeInSearchField(searchTerm);
});

Then('Only categories with names should be displayed', () => {
    CategoriesAssertions.verifyCategoriesWithNameDisplayed(searchTerm);
});

AfterAll(() => {
    deleteTestedCategories();
})