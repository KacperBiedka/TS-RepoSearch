import { statusMessages } from '../../fixtures/search';

describe("RepoSearch page", () => {
    it('sucessfully loads', () => {
        cy.visit('http://localhost:3000');
    });
    it('displays default status info', () => {
        cy.getByDataTest('empty-results-message').should('exist');
        cy.getByDataTest('status-hero').contains(statusMessages.default);
    });
    context("Initial repository search", () => {
        it("accepts user search input", () => {
            cy.getByDataTest('repo-search-input').type('test');
        });
        it("shows loader", () => {
            cy.getByDataTest('search-results-loader').should('exist');
        });
        it("displays correct data after search", () => {
            cy.getByDataTest('search-results-table').should('exist')
        });
        it("correctly updates url parameters", () => {
            cy.location().should((loc) => {
                expect(loc.search).to.eq('?field=name&order=desc&query=test');
            });
        });
    });
    context("Table operations", () => {
        it("accepts user input for entries count", () => {
            cy.getByDataTest('perPage-input').clear().type(5);
        })
        it("displays correct number of rows", () => {
            cy.getByDataTest("results-table-body-row").should('have.length', 5);
        })
        it("updates pagination", () => {
            cy.getByDataTest("pagination-paragraph").should('have.length', 6);
        });
        it("correctly filters data", () => {
            let oldRepoName;
            cy.getByDataTest("results-table-body-row").first().then(field => {
                oldRepoName = field[0].children[0].innerText.toLowerCase();
            });
            cy.getByDataTest("filter-header-cell").first().click();
            cy.getByDataTest("results-table-body-row").first().should(field => {
                const newRepoName = field[0].children[0].innerText.toLowerCase();
                expect(newRepoName < oldRepoName).to.equal(true);
            });
        });
        it("updates url parameters after filtering", () => {
            cy.location().should((loc) => {
                expect(loc.search).to.eq('?field=name&order=asc&query=test');
            });
        });
    });
});
