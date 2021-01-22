import { statusMessages } from '../../fixtures/search';

describe("RepoSearch page", () => {
    it('sucessfully loads', () => {
        cy.visit('http://localhost:3000');
    });
    it('displays default status info', () => {
        cy.get('[data-test=empty-results-message]').should('exist');
        cy.get('[data-test=status-hero]').contains(statusMessages.default);
    });
    context("Initial repository search", () => {
        it("accepts user search input", () => {
            cy.get('[data-test=repo-search-input]').type('elo');
        });
        it("shows loader", () => {
            cy.get('[data-test=search-results-loader]').should('exist');
        });
        it("correctly updates url parameters", () => {
            cy.location().should((loc) => {
                expect(loc.search).eq('?field=name&order=asc&query=elo');
            });
        });
        it("displays correct data after search", () => {
            cy.get('[data-test=search-results-table]').should('exist')
        });
    });
})
