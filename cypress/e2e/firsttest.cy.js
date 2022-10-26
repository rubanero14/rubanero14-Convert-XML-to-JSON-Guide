import sources from "../../src/assets/sources";

/* Dynamically driven Cypress test suite */
// Random number generator for sources level test subject
const randomSourceSelection = () => {
  return Math.ceil(Math.random() * sources.length + 1);
};
let firstSource = randomSourceSelection();

// Random number generator for topics level test subject
const randomSecondSourceSelection = () => {
  return Math.ceil(
    Math.random() *
      (sources[firstSource].topics.length !== undefined
        ? sources[firstSource].topics.length - 1
        : 1)
  );
};
let secondSource = randomSecondSourceSelection();

// E2E Test Suite
describe("Visit RSS Feed Home Page", () => {
  it("Visit the page", () => {
    cy.visit("http://localhost:8080/");
  });

  it("Open First Source Nav", () => {
    cy.get(`[data-cy="actions-source-${firstSource}"]`).click();
  });

  if (sources[firstSource].topics.length > 1) {
    it("Open Second Source Nav", () => {
      cy.get(`[data-cy="actions-topic-${secondSource}"]`).click();
    });

    it("Click Intended Article", () => {
      let articleLength = Cypress.$(
        '[data-cy="actions-article-wrapper"]'
      ).children().length;
      let randomArticle =
        Math.floor(Math.random() * articleLength) > 1
          ? Math.floor(Math.random() * articleLength)
          : 1;
      cy.wait(3000);
      cy.get(`[data-cy="actions-article-${randomArticle}"]`).click();
    });

    it("Back to Second Nav", () => {
      cy.get('[data-cy ="actions-back-button"]').click();
    });

    it("Back to Home Page", () => {
      cy.get('[data-cy ="actions-back-button"]').click();
    });
  } else {
    it("Click Intended Article", () => {
      let articleLength = Cypress.$(
        '[data-cy="actions-article-wrapper"]'
      ).children().length;
      let randomArticle =
        Math.floor(Math.random() * articleLength) > 1
          ? Math.floor(Math.random() * articleLength)
          : 1;
      cy.wait(3000);
      cy.get(`[data-cy="actions-article-${randomArticle}"]`).click();
    });

    it("Back to Home Page", () => {
      cy.get('[data-cy ="actions-back-button"]').click();
    });
  }
});
