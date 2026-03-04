// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
declare global {
  namespace Cypress {
    interface Chainable {
      checkBackendHealth(url?: string): Chainable<void>;
      structuralSanityCheck(): Chainable<void>;
      cleanState(): Chainable<void>;

      visitLandingPage(): Chainable<void>;
      visitMainPage(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('checkBackendHealth', (url?: string) => {
  const targetUrl = url || 'https://www.wikipedia.org/';

  cy.intercept('GET', targetUrl).as('pageRequest');
  cy.visit(targetUrl);

  cy.wait('@pageRequest').then((interception) => {
    expect(interception.response?.statusCode).to.eq(200);
    expect(interception.response?.headers['content-type']).to.include('text/html');
  });
});

Cypress.Commands.add('structuralSanityCheck', () => {
  cy.get('body').should('be.visible');
  cy.get('head').should('exist');
  cy.get('script').should('exist');
  cy.get('style').should('exist');
});

Cypress.Commands.add('cleanState', () => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
});

Cypress.Commands.add('visitLandingPage', () => {
  cy.cleanState();
  cy.checkBackendHealth('https://www.wikipedia.org/');
  cy.structuralSanityCheck();
});

Cypress.Commands.add('visitMainPage', () => {
  cy.cleanState();
  cy.checkBackendHealth('https://en.wikipedia.org/wiki/Main_Page');
  cy.structuralSanityCheck();
});

export { };