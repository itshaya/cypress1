import {AfterAll, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";
import { createCategory,deleteAllTestedCategories } from "../../utils";

beforeEach(() => {
    cy.login();
    cy.wait(500)
    createCategory(1);
})
Given('user navigates to the Categories page', () => {
    CategoriesActions.openCategoriesPage();
})

When('the list of categories is loaded', () => {
    CategoriesActions.getTablesRows();
})

Then('each category row should display a "Created At" timestamp in "YYYY-M-DD HH:M:S" format', () => {
    CategoriesAssertions.verifyCreatedAtFormat();
})

When('user clicks the "Next" or "Previous" button', () => {
    createCategory(5);
    CategoriesActions.storeCurrentNames();
    CategoriesActions.clickNextButton();
})

Then('The system should navigate to the selected page and update the displayed categories', () => {
    CategoriesAssertions.verifyNewPageHasDifferentCategories()
})

var itemNum: number = 10;
When('The user selects a specific number of items per page', () => {
    createCategory(itemNum);
    CategoriesActions.selectItemsPerPage(itemNum);
})
Then('Then The system should display the selected number of categories per page', () => {
    CategoriesAssertions.assertItemsPerPageDisplayed(itemNum);
})

When('user resizes the browser window or uses a mobile device', () => {
    CategoriesActions.changeViewPortToDevice();
})
Then('The table layout should remain readable and properly formatted', () => {
    CategoriesAssertions.verifyTableShouldRemainReadable();
})

When('The user reaches the last page', () => {
    CategoriesActions.clickUntilDisabled();
});

Then('The "Next" button should be disabled', () => {
    CategoriesAssertions.verifyNextButtonDisabled();
})

When('The user is on the first page of categories', () => {
    CategoriesActions.openCategoriesPage();
})

Then('The "Previous" button should be disabled', () => {
    CategoriesAssertions.verifyPreviousButtonDisabled();
})

AfterAll(()=>{
    deleteAllTestedCategories();
})