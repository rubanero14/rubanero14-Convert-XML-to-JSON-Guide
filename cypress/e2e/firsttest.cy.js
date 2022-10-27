import sources from "../../src/assets/sources";

// Test Env Variables
const TEST_ENV = (env = 0) =>
  env !== 0
    ? "https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/"
    : "http://localhost:8080/";

/* Dynamically driven Cypress test suite */
// Random number generator for sources level test subject
const randomSourceSelection = () => {
  return Math.floor(Math.random() * sources.length);
};
let sourcesIndex = randomSourceSelection();

// Random number generator for topics level test subject
const randomSecondSourceSelection = () => {
  if (sources[sourcesIndex].topics.length === undefined) {
    return console.log("No Topics Found!");
  }
  return Math.floor(Math.random() * sources[sourcesIndex].topics.length);
};

// E2E Test Suite
describe("Visits RSS Feed Home Page", () => {
  it("Visit the page", () => {
    // enter param 1 into TEST_ENV to test prod, leave it empty to test development
    cy.visit(TEST_ENV());
  });

  it("Open Random RSS Source", () => {
    cy.get(`[data-cy="actions-source-${sourcesIndex}"]`).click();
  });

  if (sources[sourcesIndex].topics.length > 1) {
    it("Open Random Topic", () => {
      cy.get(
        `[data-cy="actions-topic-${randomSecondSourceSelection()}"]`
      ).click();
    });

    it("Click Random Article", () => {
      let articleLength = Cypress.$(
        '[data-cy="actions-article-wrapper"]'
      ).children().length;
      let randomArticle = Math.floor(Math.random() * articleLength);
      cy.wait(5000);
      cy.get(`[data-cy="actions-article-${randomArticle}"]`).click();
    });

    it("Back to Second Nav", () => {
      cy.get('[data-cy ="actions-back-button"]').click();
    });

    it("Back to Home Page", () => {
      cy.get('[data-cy ="actions-back-button"]').click();
    });
  } else {
    it("Click Random Article", () => {
      let articleLength = Cypress.$(
        '[data-cy="actions-article-wrapper"]'
      ).children().length;
      let randomArticle = Math.floor(Math.random() * articleLength);
      cy.wait(5000);
      cy.get(`[data-cy="actions-article-${randomArticle}"]`).click();
    });

    it("Back to Home Page", () => {
      cy.get('[data-cy ="actions-back-button"]').click();
    });
  }
});
