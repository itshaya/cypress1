import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";
import { CategoriesAssertions } from "../../pageObjects/assertions";


Given('The user is logged in', () => {
    cy.login()
});

Given('navigates to the Categories page', () => {
    CategoriesActions.openCategoriesPage();
})

When('the list of categories is loaded', () => {
    CategoriesActions.getTablesRows();
})

Then('each category row should display a "Created At" timestamp in "YYYY-MM-DD HH:MM:SS" format', () => {
    CategoriesAssertions.verifyCreatedAtFormat();
})

var pageNum: number;
When('user clicks the "Next" or "Previous" button', () => {
    cy.get('button').contains('Next').as('nextButton');
    cy.get('.table-controls__actions').children('p').as('prevPageNum');
    cy.get('@prevPageNum')
        .invoke('text')
        .then((text) => {
            pageNum = Number(text.trim())
        });

    cy.get('@nextButton').click();
})

Then('The system should navigate to the selected page and update the displayed categories', () => {
    cy.get('.table-controls__actions')
        .children('p')
        .invoke('text')
        .then((text) => {
            const updatedPageNum = Number(text.trim());
            expect(updatedPageNum).to.equal(pageNum + 1);
        });
})
var itemNum: number;
When('The user selects a specific number of items per page', () => {
    cy.get('#query').select('10');
    itemNum = 10;
})

Then('Then The system should display the selected number of categories per page', () => {
    cy.get('.table-body')
        .children()
        .should('have.length', itemNum);
})