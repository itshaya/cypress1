import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";


Given('The user is logged in', () => {
    cy.login()
});

Given('navigates to the Categories page', () => {
    CategoriesActions.openCategoriesPage();
})


When('The user sorts the "Name" column in ascending order', () => {
    CategoriesActions.clickSortButton(2, 0);
})

Then('Categories should be displayed in ascending order according to name', () => {
    CategoriesAssertions.verifyCategoriesSortedByName('ascending');
});

When('The user sorts the "Name" column in descending order', () => {
    CategoriesActions.clickSortButton(1, 0);
})

Then('Categories should be displayed in descending order according to name', () => {
    CategoriesAssertions.verifyCategoriesSortedByName('descending');
})

When('The user sorts the "CreatedAt" column in ascending order', () => {
    CategoriesActions.clickSortButton(2, 1);
})

Then('Categories should be displayed in ascending order according to CreatedAt', () => {
    CategoriesAssertions.verifyCategoriesSortedByCreatedAt('ascending');
});

When('The user sorts the "CreatedAt" column in descending order', () => {
    CategoriesActions.clickSortButton(1, 1);
})

Then('Categories should be displayed in descending order according to CreatedAt', () => {
    CategoriesAssertions.verifyCategoriesSortedByCreatedAt('descending');
});

When('The user enters {string} in the search field', (searchTerm: string) => {
    CategoriesActions.typeInSearchField(searchTerm);
});

Then('Only categories with names including {string} should be displayed', (searchTerm: string) => {
    CategoriesAssertions.verifyCategoriesWithNameDisplayed(searchTerm);
}); 