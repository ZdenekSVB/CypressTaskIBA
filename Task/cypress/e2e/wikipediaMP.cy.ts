
describe("main page of english wikipedia", () => {

    beforeEach(() => {
        cy.visitMainPage();
    });

    it("appierence buttons change the theme of the page", () => {
        cy.get("#skin-client-pref-wp25eastereggs-enable-value-0")
            .should('not.be.checked');
        cy.get("#skin-client-pref-wp25eastereggs-enable-value-1")
            .check({ force: true })
            .should('be.checked');

        cy.get("#skin-client-pref-vector-feature-custom-font-size-value-0")
            .should('not.be.checked');
        cy.get("#skin-client-pref-vector-feature-custom-font-size-value-1")
            .should('not.be.checked');
        cy.get("#skin-client-pref-vector-feature-custom-font-size-value-2")
            .check({ force: true })
            .should('be.checked');

        cy.get("#skin-client-pref-vector-feature-limited-width-value-0")
            .check({ force: true })
            .should('be.checked');
        cy.get("#skin-client-pref-vector-feature-limited-width-value-1")
            .should('not.be.checked');

        cy.get("#skin-client-pref-skin-theme-value-os")
            .should('not.be.checked');
        cy.get("#skin-client-pref-skin-theme-value-day")
            .should('not.be.checked');
        cy.get("#skin-client-pref-skin-theme-value-night")
            .check({ force: true })
            .should('be.checked');
    });

});