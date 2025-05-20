import cypress from "cypress";
import { SortingType } from "../fixtures/data";
import { url } from "../utils";
export class CategoriesAssertions {

    static verifyCreatedAtFormat() {
        const TIME_REGEX = /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/;
        cy.get('@table-rows').each(($row) => {
            cy.wrap($row)
                .find('td')
                .eq(1)
                .invoke('text')
                .invoke('trim')
                .should('match', TIME_REGEX);
        });
    }

    static verifyNewPageHasDifferentCategories(names: string[]): void {
        cy.get('tr.table-body-row').each(($row) => {
            cy.wrap($row)
                .find('td')
                .eq(0)
                .invoke('text')
                .then((newName) => {
                    expect(names).to.not.include(newName.trim());
                });
        });
    }

    static assertItemsPerPageDisplayed(num: number) {
        cy.get('.table-body')
            .children()
            .should('have.length.at.most', num);
    }

    static verifyButtonDisabled(button: 'Previous' | 'Next') {
        cy.get('button').contains(button).should('be.disabled');
    }

    static verifyCategoriesSortedByName(sortType: SortingType) {
        
        cy.get('tr.table-body-row', { timeout: 10000 }).should('have.length.at.least', 1);
        
        cy.get('tr.table-body-row td:first-child')
            .then(($cells) => {
                const names: string[] = Array.from($cells, el => el.textContent?.trim() || '');

                cy.log('Actual names:', JSON.stringify(names));
                console.log("Actual names:", names);

                const sortedNames = [...names].sort((a, b) =>
                    sortType === 'ascending'
                        ? a.localeCompare(b, 'en', { sensitivity: 'base' })
                        : b.localeCompare(a, 'en', { sensitivity: 'base' })
                );

                cy.log('Expected sorted names:', JSON.stringify(sortedNames));
                console.log("Expected sorted names:", sortedNames);

                expect(names, 'Names should be sorted correctly').to.deep.equal(sortedNames);
            });
    }



    static verifyCategoriesSortedByCreatedAt(sortType: SortingType) {
        cy.get('tr.table-body-row td:nth-child(2)').then(($cells) => {
            const dates = [...$cells].map((el) => {
                const text = el.textContent?.trim() || '';
                const parsedDate = new Date(text.replace(/-/g, '/'));
                return parsedDate;
            });

            const sortedDates = [...dates].sort((a, b) =>
                sortType === 'ascending'
                    ? a.getDate() - b.getDate()
                    : b.getDate() - a.getDate()
            );

            expect(dates).to.deep.equal(sortedDates);
        });
    }

    static verifyCategoriesWithNameDisplayed(searchTerm: string) {
        cy.get('tr.table-body-row td:nth-child(1)').each(($cell) => {
            const cellText = $cell.text().trim().toLowerCase();
            expect(cellText).to.include(searchTerm.toLowerCase());
        });
    }

    static verifyVisibilityOfAddCategoryModal() {
        cy.get('.modal').should('be.visible');
    }

    static verifyVisibilityOfNameRequiredMessage() {
        cy.contains('Name is required').should('be.visible');
    }

    static assertCategoryIsVisible(name: string) {
        cy.get('tbody.table-body td').contains(name).should('be.visible');
    }

    static verifySuccessMessageVisibility() {
        cy.get('.go3958317564').should('be.visible');
    }

    static verifyCategoryExistMessageVisibility() {
        cy.contains('This category already exist').should('be.visible')
    }

    static verifyCancellationProcessNotAdded(categoryIntercepted: boolean) {
        cy.then(() => {
            expect(categoryIntercepted).to.be.false;
        })
    }

    static verifyEachCategoryHasEditButton() {
        cy.get('.table-body tr').each(($tr) => {
            cy.wrap($tr).find('td').eq(2).find('button').eq(1).should('be.visible');
        });
    }

    static verifyEditFormOpenWithPrefilledCategoryName() {
        cy.get('@expectedCategoryName').then((aliasValue) => {
            const expectedName = aliasValue;
            cy.get('#name').invoke('val').then((actualValue) => {
                expect(actualValue?.toString().trim()).to.eq(expectedName);
            });
        });
    }

    static verifyCategoryUpdatedSuccessfully(name: string) {
        cy.wait(1000);
        cy.get('.table-body tr').eq(0).find('td').eq(0)
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq(name);
            });
    }

    static verifyCategoryRemovedFromTable() {
        cy.request(url)
            .then((response) => {
                const data = response.body;
                for (const key in data) {
                    const category = data[key];
                    expect(cy.get('@deletedName')).to.not.equal(category?.name);
                }
            });
    }

    static verifyTableShouldRemainReadable() {
        cy.get('table').should('be.visible');
        cy.get('table td').each(($el) => {
            cy.wrap($el).should('not.be.empty');
        });
    }

    static verifyDeleteModalVisible() {
        cy.get('.modal__content').should('be.visible');
    }

}