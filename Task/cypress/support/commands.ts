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
        checkBackendHealth(): Chainable<void>;
        structuralSanityCheck(): Chainable<void>;
        cleanState(): Chainable<void>;
      }
    }
    }

  Cypress.Commands.add('checkBackendHealth', () => {
    cy.intercept('GET', 'https://www.wikipedia.org/').as('mainPage');
    cy.visit("https://www.wikipedia.org/");
    cy.wait('@mainPage').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.headers['content-type']).to.include('text/html');
    });
  });

  Cypress.Commands.add('structuralSanityCheck', () => {
    cy.get('body').should('be.visible');
    cy.get('#searchInput').should('exist');
  });

  Cypress.Commands.add('cleanState', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

export {};