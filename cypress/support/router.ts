import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import * as NextRouter from 'next/navigation';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Configura o mock do router do Next.js para testes de componentes
       * @example
       * cy.mockNextRouter()
       * cy.mount(<Component />)
       */
      mockNextRouter(): Chainable<AppRouterInstance>;
    }
  }
}

Cypress.Commands.add('mockNextRouter', () => {
  const mockRouter: AppRouterInstance = {
    push: cy.stub().as('router:push'),
    replace: cy.stub().as('router:replace'),
    back: cy.stub().as('router:back'),
    forward: cy.stub().as('router:forward'),
    refresh: cy.stub().as('router:refresh'),
    prefetch: cy.stub().as('router:prefetch'),
  };

  cy.stub(NextRouter, 'useRouter').returns(mockRouter);
  return cy.wrap(mockRouter);
});
