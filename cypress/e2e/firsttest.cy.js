import sources from "../../src/assets/sources";

const randomSourceSelection = () => {
  return Math.floor(Math.random() * sources.length + 1);
};

const randomSecondSourceSelection = () => {
  return Math.floor(Math.random() * sources[firstSource].topics.length + 1);
};

let firstSource = randomSourceSelection();
let secondSource = randomSecondSourceSelection();

describe("Visit RSS Feed Home Page", () => {
  it("Visit the page", () => {
    cy.visit("http://localhost:8080/");
  });

  it("Open First Source Nav", () => {
    cy.wait(4000);
    cy.get(
      `#app > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(${firstSource}) > center > a`
    ).click();
    cy.wait(4000);
  });

  if (sources[firstSource].topics.length > 1) {
    it("Open Second Source Nav", () => {
      cy.wait(4000);
      cy.get(
        `#app > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(${secondSource}) > center > a`
      ).click();
      cy.wait(4000);
    });

    it("Click Intended Article", () => {
      cy.wait(4000);
      let articleLength = Cypress.$(
        "#app > div > div > div:nth-child(2) > div:nth-child(2) > div"
      ).children().length;
      cy.wait(4000);
      let randomArticle = Math.floor(Math.random() * articleLength + 1);
      console.log(firstSource, secondSource, randomArticle);
      cy.get(`.articles-wrapper > div:nth-child(${randomArticle})`).click();
      cy.wait(4000);
    });

    it("Back to Second Nav", () => {
      cy.wait(4000);
      cy.get(
        "#app > div > div > div:nth-child(2) > div:nth-child(1) > button"
      ).click();
    });

    it("Back to Home Page", () => {
      cy.wait(4000);
      cy.get(
        "#app > div > div > div:nth-child(2) > div:nth-child(1) > button"
      ).click();
    });
  } else {
    it("Click Intended Article", () => {
      cy.wait(4000);
      let articleLength = Cypress.$(".articles-wrapper").children().length;
      let randomArticle = Math.floor(Math.random() * articleLength + 1);
      console.log(firstSource, randomArticle);
      cy.wait(4000);
      cy.get(`.articles-wrapper > div:nth-child(${randomArticle})`).click();
    });

    it("Back to Home Page", () => {
      cy.wait(4000);
      cy.get(
        "#app > div > div > div:nth-child(2) > div:nth-child(1) > button"
      ).click();
    });
  }
});
