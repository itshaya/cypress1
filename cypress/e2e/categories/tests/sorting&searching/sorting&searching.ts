import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../../pageObjects/actions";


Given('The user is logged in', () => {
    cy.login()
});

Given('navigates to the Categories page', () => {
    CategoriesActions.openCategoriesPage();
})


When('The user sorts the "Name" column in ascending order', () => {
    cy.get('.sort-btn').eq(0).click()
    cy.get('.sort-btn').eq(0).click()
})

Then('Categories should be displayed in ascending order according to name', () => {
    const names: string[] = [];

    cy.get('tr.table-body-row td:first-child').each(($el) => {
        names.push($el.text().trim());
    }).then(() => {
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).to.deep.equal(sortedNames);
    });
});

When('The user sorts the "Name" column in descending order', () => {
    cy.get('.sort-btn').eq(0).click()
})

Then('Categories should be displayed in descending order according to name', () => {
    const names: string[] = [];

    cy.get('tr.table-body-row td:first-child').each(($el) => {
        names.push($el.text().trim());
    }).then(() => {
        const sortedNamesDesc = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).to.deep.equal(sortedNamesDesc);
    });
})

When('The user sorts the "CreatedAt" column in ascending order', () => {
    cy.get('.sort-btn').eq(1).click();
    cy.get('.sort-btn').eq(1).click();
})

Then('Categories should be displayed in ascending order according to CreatedAt', () => {
    const dates: Date[] = [];

    cy.get('tr.table-body-row td:nth-child(2)').each(($el) => {
        const text = $el.text().trim();
        const parsedDate = new Date(text.replace(/-/g, '/'));
        dates.push(parsedDate);
    }).then(() => {
        const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
        expect(dates).to.deep.equal(sortedDates);
    });
});

When('The user sorts the "CreatedAt" column in descending order', () => {
    cy.get('.sort-btn').eq(1).click();
})

Then('Categories should be displayed in descending order according to CreatedAt', () => {
    const dates: Date[] = [];

    cy.get('tr.table-body-row td:nth-child(2)').each(($el) => {
        const text = $el.text().trim();
        const parsedDate = new Date(text.replace(/-/g, '/'));
        dates.push(parsedDate);
    }).then(() => {
        const sortedDates = [...dates].sort((a, b) => b.getTime() - a.getTime());
        expect(dates).to.deep.equal(sortedDates);
    });
});

When('The user enters {string} in the search field', (searchTerm: string) => {
    cy.get('#search').clear().type(searchTerm);
});

Then('Only categories with names including {string} should be displayed', (searchTerm: string) => {
    cy.get('tr.table-body-row td:nth-child(1)').each(($cell) => {
        const cellText = $cell.text().trim().toLowerCase();
        expect(cellText).to.include(searchTerm.toLowerCase());
    });
}); 