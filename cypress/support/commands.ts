/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
import './router';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Seleciona um elemento pelo atributo data-cy
       * @example
       * cy.getByDataCy('my-element')
       */
      getByDataCy(dataCyValue: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('getByDataCy', (dataCyValue: string) => {
  return cy.get(`[data-cy="${dataCyValue}"]`);
});
