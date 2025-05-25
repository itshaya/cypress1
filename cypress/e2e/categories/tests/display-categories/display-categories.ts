import {  Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";
import { createCategory, deleteTestedCategories as deleteTestedCategories, generateTestCategories } from "../../utils";

const itemNum: number = 10;
const names: string[] = [];

before(() => {
    createCategory(generateTestCategories(itemNum));
});

beforeEach(() => {
    cy.login();
});

When('the list of categories is loaded', () => {
    CategoriesActions.getTablesRows();
})

When('user clicks the Next or Previous button', () => {
    CategoriesActions.storeCurrentNames(names);
    CategoriesActions.clickNextButton();
})

When('The user selects a specific number of items per page', () => {
    CategoriesActions.selectItemsPerPage(itemNum);
})

When('user resizes the browser window or uses a mobile device', () => {
    CategoriesActions.changeViewPortToDevice();
})

When('The user is on the first page of categories', () => {
    CategoriesActions.openCategoriesPage();
});

When('The user navigates to the last page', () => {
    CategoriesActions.clickUntilDisabled();
});


Then('each category row should display a Created At timestamp in YYYY-M-DD HH:M:S format', () => {
    CategoriesAssertions.verifyCreatedAtFormat();
})

Then('The system should navigate to the selected page and update the displayed categories', () => {
    CategoriesAssertions.verifyNewPageHasDifferentCategories(names);
})

Then('Then The system should display the selected number of categories per page', () => {
    CategoriesAssertions.assertItemsPerPageDisplayed(itemNum);
})

Then('The table layout should remain readable and properly formatted', () => {
    CategoriesAssertions.verifyTableShouldRemainReadable();
});

Then('The {string} button should be disabled', (button: 'Previous' | 'Next') => {
    CategoriesAssertions.verifyButtonDisabled(button);
});

after(() => {
    deleteTestedCategories();
})