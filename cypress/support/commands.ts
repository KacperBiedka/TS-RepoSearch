declare namespace Cypress {
    interface Chainable<Subject> {
      /**
     * Custom command to select DOM element by data-test attribute.
     * @example cy.getByDataTest('loading')
    */
      getByDataTest(tag: string): Chainable<Subject>;
    }
  }

Cypress.Commands.add("getByDataTest", (selector) => {
    return cy.get(`[data-test=${selector}]`);
});