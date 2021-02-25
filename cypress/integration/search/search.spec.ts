import { statusMessages } from '../../fixtures/search';

const searchQuery = 'siema';

describe("RepoSearch page", () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.intercept('https://api.github.com/search/repositories', { fixture: 'queryResults.json' });
    });
    it('sucessfully loads', () => {
        cy.visit('http://localhost:3000');
    });
    it('displays default status info', () => {
        cy.getByDataTest('empty-results-message').should('exist');
        cy.getByDataTest('status-hero').contains(statusMessages.default);
    });
    context("Initial repository search", () => {
        it("accepts user search input", () => {
            cy.getByDataTest('repo-search-input').type(searchQuery);
        });
        it("shows loader", () => {
            cy.getByDataTest('search-results-loader').should('exist');
        });
        it("correctly displays data after search", () => {
            cy.getByDataTest('search-results-table').should('exist', { timeout: 10000 })
            cy.getByDataTest('results-table-body-row').first().children().first().contains('xtal-siema')
        });
        it("correctly updates url parameters", () => {
            cy.location().should(async (loc) => {
                expect(loc.search).to.eq(`?field=name&order=desc&query=${searchQuery}`);
            });
        });
    });
    context("Table operations", () => {
        it("accepts user input for entries count", () => {
            cy.getByDataTest('perPage-input').clear().type("5");
        })
        it("displays correct number of rows", () => {
            cy.getByDataTest("results-table-body-row").should('have.length', 5);
        })
        it("updates pagination", () => {
            cy.getByDataTest("pagination-paragraph").should('have.length', 6);
        });
        it("correctly filters data", () => {
            cy.getByDataTest("filter-header-cell").first().click()
            cy.getByDataTest('results-table-body-row').first().children().first().contains('Balon')
        });
        it("updates url parameters after filtering", () => {
            cy.location().should((loc) => {
                expect(loc.search).to.eq(`?field=name&order=asc&query=${searchQuery}`);
            });
        });
        it("shows next data page on pagination click", () => {
            cy.getByDataTest("pagination-paragraph").last().click();
        });
    });
    context("Error handling", () => {
        it("shows correct message for empty search query", () => {
            cy.getByDataTest('repo-search-input').clear().type(" ");
            cy.getByDataTest('status-hero').contains(statusMessages.empty);
        })
        it("shows correct message for too long search query", () => {
            cy.getByDataTest('repo-search-input').clear().type('very long name made for testing purposes');
            cy.getByDataTest('status-hero').contains(statusMessages.long);
        })
    });
});
