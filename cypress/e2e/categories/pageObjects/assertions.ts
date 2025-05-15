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

    static verifyNextButtonDisabled() {
        cy.get('button').contains('Next').should('be.disabled');
    }

    static verifyPreviousButtonDisabled() {
        cy.get('button').contains('Previous').should('be.disabled');
    }


    // static verifyCategoriesSortedByName(sortType: SortingType) {
    //     const names: string[] = [];

    //     cy.get('tr.table-body-row td:first-child').each(($el) => {
    //         names.push($el.text().trim());
    //     }).then(() => {
    //         let sortedNames;
    //         if (sortType === 'ascending') {
    //             sortedNames = [...names].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
    //         } else {
    //             sortedNames = [...names].sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }));
    //         }

    //         expect(names).to.deep.equal(sortedNames);
    //     });
    // }

    // static verifyCategoriesSortedByName(sortType: SortingType) {
    //     cy.get('tr.table-body-row td:first-child').then(($cells) => {
    //         const names = [...$cells].map(el => el.textContent?.trim().toLowerCase() || '');

    //         const sortedNames = [...names].sort((a, b) => {
    //             if (a < b) return sortType === 'ascending' ? -1 : 1;
    //             if (a > b) return sortType === 'ascending' ? 1 : -1;
    //             return 0;
    //         });

    //         console.log('Actual:', names);
    //         console.log('Expected:', sortedNames);

    //         expect(names).to.deep.equal(sortedNames);
    //     });
    // }

    static verifyCategoriesSortedByName(sortType: SortingType) {
        cy.get('table').should('exist');

        cy.wait(1000);

        cy.get('tr.table-body-row td:first-child').then(($cells) => {
            const names = [...$cells].map(el => el.textContent?.trim().toLowerCase() || '');

            const sortedNames = [...names].sort((a, b) => {
                if (a < b) return sortType === 'ascending' ? -1 : 1;
                if (a > b) return sortType === 'ascending' ? 1 : -1;
                return 0;
            });

            console.log(' Actual names:', names);
            console.log(' Expected sorted:', sortedNames);

            
            expect(names, 'Category names should be sorted correctly').to.deep.equal(sortedNames);
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

    static verifyCategoryUpdatedSuccessfully() {
        cy.wait(1000);
        cy.get('@newName').then((newName) => {
            cy.get('.table-body tr').eq(0).find('td').eq(0)
                .invoke('text')
                .then((text) => {
                    expect(text.trim()).to.eq(newName);
                });
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