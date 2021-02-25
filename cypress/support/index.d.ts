/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      /**
     * Custom command to select DOM element by data-test attribute.
     * @example cy.getByDataTest('loading')
    */
      getByDataTest(tag: string): Chainable<Subject>;
    }
  }
  