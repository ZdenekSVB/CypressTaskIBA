
describe("landing page of wikipedia", () => {

  beforeEach(() => {
    cy.cleanState();
    cy.checkBackendHealth();
    cy.structuralSanityCheck();
  });

  it("check new components of the page for any wikipedia year celebration", () => {
    cy.get("[id*='wikipedia'] [id*='cta-button']").should("be.visible");
    cy.get("[class*='wikipedia'] [class*='-slogan']").should("be.visible");
    cy.get("[id*='wikipedia'] [id*=-video]").should("be.visible");
    cy.get("[class*='wikipedia'] [class*='-cta-description']").should("be.visible");
    });

    it("change site from celebration to normalty and check if all the components are hidden", () => {
        cy.get("#wikipedia25-birthday-mode-toggle-switch").click();

        cy.get("[id*='wikipedia'] [id*='cta-button']").should("not.be.visible");
        cy.get("[class*='wikipedia'] [class*='-slogan']").should("not.be.visible");
        cy.get("[id*='wikipedia'] [id*=-video]").should("not.be.visible");
        cy.get("[class*='wikipedia'] [class*='-cta-description']").should("not.be.visible");
        
        cy.get(".localized-slogan").should("be.visible");
        cy.get(".central-featured-logo").should("be.visible");
    });


  it("click on play button and test if video is downloaded from backend and played", () => {
    cy.intercept("GET","**wikipedia25_welcome*.webm").as("welcomeVideo");

    cy.get("#wikipedia25-play-button").click();

    cy.wait("@welcomeVideo").its("response.statusCode").should("eq", 200);
    cy.wait(1000);

    cy.get("video").and((video) => {
        expect(video[0].currentTime).to.be.greaterThan(0);
    });
  });

  it("searchbox has all the languages (76)", () => {
    cy.get("#searchLanguage option").should("have.length", 76);
    });

    it("change language to czech and show article for letter A with link and downloaded placeholder", () => {
        cy.get("#searchLanguage").select("Čeština");
        cy.get("#searchInput").type("A");
        cy.get(".suggestions-dropdown").should("be.visible")
        cy.get(".suggestions-dropdown .suggestion-link").should("have.attr", "href").and("include", "https://cs.wikipedia.org/wiki/A");
        cy.intercept("GET","data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 56'%3E%3Cpath fill='%23eee' d='M0 0h56v56H0z'/%3E%3Cpath fill='%23999' d='M36.4 13.5H17.8v24.9c0 1.4.9 2.3 2.3 2.3h18.7v-25c.1-1.4-1-2.2-2.4-2.2zM30.2 17h5.1v6.4h-5.1V17zm-8.8 0h6v1.8h-6V17zm0 4.6h6v1.8h-6v-1.8zm0 15.5v-1.8h13.8v1.8H21.4zm13.8-4.5H21.4v-1.8h13.8v1.8zm0-4.7H21.4v-1.8h13.8v1.8z'/%3E%3C/svg%3E")
    });

    it("search and get to the main page of wikipedia for english language", () => {
        cy.get("#searchLanguage").select("English");
        cy.get("#searchInput").type("Main Page{enter}");
        cy.url().should("include", "https://en.wikipedia.org/wiki/Main_Page");
    });

});

describe("main page of english wikipedia", () => {

    beforeEach(() => {
        cy.visit("https://en.wikipedia.org/wiki/Main_Page");
    });
});