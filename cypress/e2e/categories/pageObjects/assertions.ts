import { currentCreatedAt } from "../utils";
export class CategoriesAssertions {
    private static TIME_REGEX =/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/;

    private static normalizeDateStr(str:string):string {
        return str
        .split(/[- :]/) 
        .map((part) => part.padStart(2, '0')) 
        .join('-')
        .replace(/-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/, ' $1:$2:$3');   
    }

    static verifyCreatedAtFormat() {
        cy.get('@table-rows').each(($row) => {
            cy.wrap($row)
                .find('td')
                .eq(1)
                .invoke('text')
                .invoke('trim')
                .should('match',this.TIME_REGEX);
        });
    }

    static verifyNewPageHasDifferentCategories(): void {
        cy.get('tr.table-body-row').each(($row) => {
            cy.wrap($row)
                .find('td')
                .eq(1)
                .invoke('text')
                .then((newCreatedAt) => {
                    expect(currentCreatedAt).to.not.include(newCreatedAt.trim());
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

    static verifyCategoriesSortedByName(sortType: string) {
        const names: string[] = [];

        cy.get('tr.table-body-row td:first-child').each(($el) => {
            names.push($el.text().trim());
        }).then(() => {
            let sortedNames;
            if (sortType === 'ascending') {
                sortedNames = [...names].sort((a, b) => a.localeCompare(b));
            } else {
                sortedNames = [...names].sort((a, b) => b.localeCompare(a));
            }

            expect(names).to.deep.equal(sortedNames);
        });
    }

    static verifyCategoriesSortedByCreatedAt(sortType: string) {
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


}