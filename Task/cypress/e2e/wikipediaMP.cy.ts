
describe("main page of english wikipedia", () => {

    beforeEach(() => {
        cy.viewport(1440, 900);
        cy.visitMainPage();
    });

    it("appearance menu radio buttons correctly toggle mutually exclusive options", () => {
        cy.get("#skin-client-pref-wp25eastereggs-enable-value-1")
            .check({ force: true })
            .should("be.checked");
        cy.get("#skin-client-pref-wp25eastereggs-enable-value-0")
            .should("not.be.checked");

        cy.get("#skin-client-pref-vector-feature-custom-font-size-value-2")
            .check({ force: true })
            .should("be.checked");
        cy.get("#skin-client-pref-vector-feature-custom-font-size-value-0")
            .should("not.be.checked");
        cy.get("#skin-client-pref-vector-feature-custom-font-size-value-1")
            .should("not.be.checked");

        cy.get("#skin-client-pref-vector-feature-limited-width-value-0")
            .check({ force: true })
            .should("be.checked");
        cy.get("#skin-client-pref-vector-feature-limited-width-value-1")
            .should("not.be.checked");

        cy.get("#skin-client-pref-skin-theme-value-night")
            .check({ force: true })
            .should("be.checked");
        cy.get("#skin-client-pref-skin-theme-value-os")
            .should("not.be.checked");
        cy.get("#skin-client-pref-skin-theme-value-day")
            .should("not.be.checked");

    });

    it("pins and unpins the Page Tools menu", () => {
        cy.get("#vector-page-tools-unpinned-container")
            .find("#vector-page-tools")
            .should("exist");

        cy.get("[data-event-name='pinnable-header.vector-page-tools.unpin']")
            .click({ force: true });

        cy.get("#vector-page-tools-pinned-container")
            .find("#vector-page-tools")
            .should("exist");

        cy.get("[data-event-name='pinnable-header.vector-page-tools.pin']")
            .click({ force: true });

        cy.get("#vector-page-tools-unpinned-container")
            .find("#vector-page-tools")
            .should("exist");
    });

    it("pins and unpins the Appearance menu", () => {
        cy.get("#vector-appearance-pinned-container")
            .find("#vector-appearance")
            .should("exist");

        cy.get("[data-event-name='pinnable-header.vector-appearance.unpin']")
            .click({ force: true });

        cy.get("#vector-appearance-unpinned-container")
            .find("#vector-appearance")
            .should("exist");

        cy.get("[data-event-name='pinnable-header.vector-appearance.pin']")
            .click({ force: true });
        cy.get("#vector-appearance-pinned-container")
            .find("#vector-appearance")
            .should("exist");
    });

    it("show first link popup in an article", () => {
        cy.get(".mw-parser-output p a").not(".new").first().as("wikiLink");

        cy.get("@wikiLink")
            .scrollIntoView()
            .trigger("mouseenter")
            .trigger("mouseover");

        cy.get(".mwe-popups", { timeout: 8000 })
            .should("exist")
            .and("not.have.class", "mwe-popups-fade-out-down")
            .and("have.class", "mwe-popups-fade-in-up");

        cy.get(".mwe-popups .mwe-popups-extract")
            .should("exist")
            .invoke("text")
            .should("not.be.empty");
    });

    it("check if page has loaded image of the day correctly", () => {
        cy.get("#mp-tfp").as("imageOfTheDay");
        cy.get("@imageOfTheDay").find("img")
            .should("exist")
            .and("be.visible")
            .and("have.attr", "src")
            .and("include", "//upload.wikimedia.org/");
    });

    it("check if all links on the page have a non-empty href attribute", () => {

        cy.get("a[href]").each(($link) => {
            const hrefValue = $link.attr("href");
            expect(hrefValue.trim()).to.not.be.empty;
        });

    });

    it("check if download link of pdf version of the article is working", () => {
        cy.intercept("GET", "https://en.wikipedia.org/api/rest_v1/page/pdf/Main_Page").as("pdfDownload");

        cy.get("#coll-download-as-rl")
            .should("exist").find("a")
            .and("have.attr", "href")
            .and("include", "/w/index.php?title=Special:DownloadAsPdf&page=Main_Page&action=show-download-screen");
        cy.get("#coll-download-as-rl a").click({ force: true });

        cy.url().should("include", "Special:DownloadAsPdf");
        cy.contains('button', 'Download').click();
        cy.wait("@pdfDownload").its("response.statusCode").should("eq", 200);

    });

    it("vyhledávání po zadání textu zobrazí našeptávač", () => {
        cy.intercept('GET', '**/rest.php/v1/search/title**').as('searchApi');

        cy.get('#searchInput').type('Cypress (software)');

        cy.wait('@searchApi').its('response.statusCode').should('eq', 200);

        cy.get('.cdx-typeahead-search__menu')
            .should('be.visible')
            .find('.cdx-menu-item')
            .should('have.length.greaterThan', 0)

        cy.get('.cdx-menu-item__text__label')
            .first()
            .should('contain.text', 'Cypress (software)');

        cy.get('.cdx-menu-item__text__description')
            .first()
            .should('contain.text', 'JavaScript testing framework');

    });
});