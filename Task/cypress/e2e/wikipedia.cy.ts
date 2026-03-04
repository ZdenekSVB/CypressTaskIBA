
describe("landing page of wikipedia", () => {
    const LandingElements = [
        "[id*='wikipedia'][id*='-cta-button']",
        "[class*='wikipedia'][class*='-slogan']",
        "[id*='wikipedia'][id*='-video']",
        "[class*='wikipedia'][class*='-cta-description']"
    ];

    beforeEach(() => {
        cy.visitLandingPage();
    });

    it("check new components of the page for any wikipedia year celebration", () => {
        LandingElements.forEach((selector) => {
            cy.get(selector).should("be.visible");
        });
    });

    it("change site from celebration to normal and check if all the components are hidden", () => {
        cy.get("[id*='-birthday-mode-toggle-switch']").click();

        LandingElements.forEach((selector) => {
            cy.get(selector).should("not.be.visible");
        });

        cy.get(".localized-slogan").should("be.visible");
        cy.get(".central-featured-logo").should("be.visible");
    });

    it("check if there are exactly 10 central language links around the globe", () => {
        cy.get("[id*='js-link-box-']")
            .should("have.length", 10)
            .and("be.visible");
    });

    it("check if central-featured nav has ::after pseudo-element on iPhone SE", () => {
        cy.viewport("iphone-se2");

        cy.get("nav.central-featured").should(($nav) => {
            const afterContent = window.getComputedStyle($nav[0], "::after").getPropertyValue("content");

            expect(afterContent).to.not.equal("none");
            expect(afterContent).to.not.be.empty;
        });
    });

    it("click on language list button and check if the active class is added", () => {
        cy.get(".jsl10n-visible").should("not.have.class", "lang-list-active");

        cy.get("#js-lang-list-button").click();

        cy.get(".jsl10n-visible").should("have.class", "lang-list-active");
    });

    it("click on play button and test if video is downloaded from backend and played", () => {
        cy.intercept("GET", "**wikipedia*_welcome*.webm").as("welcomeVideo");

        cy.get("[id*='-play-button']").click();

        cy.wait("@welcomeVideo").its("response.statusCode").should("eq", 200);
        cy.wait(1000);

        cy.get("video").and((video) => {
            expect(video[0].currentTime).to.be.greaterThan(0);
        });
    });

    it("searchbox has all the languages (76) controlled by languages.json", () => {
        cy.fixture("languages.json").then((languages) => {
            languages.forEach((lang) => {
                cy.get(`#searchLanguage option[value="${lang.value}"]`)
                    .should("exist")
            });
        });
    });

    it("change language to czech and show article for letter A with link and downloaded placeholder", () => {
        cy.get("#searchLanguage").select("Čeština");
        cy.get("#searchInput").type("A");
        cy.get(".suggestions-dropdown").should("be.visible")
        cy.get(".suggestions-dropdown .suggestion-link").should("have.attr", "href").and("include", "https://cs.wikipedia.org/wiki/A");
        cy.get(".suggestions-dropdown .suggestion-thumbnail").first()
            .should("have.css", "background-image")
            .and("include", "data:image/svg+xml");
    });


});

describe("main page of english wikipedia", () => {

    beforeEach(() => {
        cy.visitMainPage();
    });

});