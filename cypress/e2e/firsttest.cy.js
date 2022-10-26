import sources from "../../src/assets/sources";

const randomSourceSelection = () => {
  return Math.ceil(Math.random() * sources.length + 1);
};

let firstSource = randomSourceSelection();

const randomSecondSourceSelection = () => {
  return Math.ceil(Math.random() * sources[firstSource].topics.length + 1);
};

let secondSource = randomSecondSourceSelection();

describe("Visit RSS Feed Home Page", () => {
  it("Visit the page", () => {
    cy.visit("http://localhost:8080/");
  });

  it("Open First Source Nav", () => {
    cy.get(
      `#app > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(${firstSource}) > center > a`
    ).click();
  });

  if (sources[firstSource].topics.length > 1) {
    it("Open Second Source Nav", () => {
      cy.get(
        `#app > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(${secondSource}) > center > a`
      ).click();
    });

    it("Click Intended Article", () => {
      let articleLength = Cypress.$(
        "#app > div > div > div:nth-child(2) > div:nth-child(2) > div"
      ).children().length;
      let randomArticle =
        Math.floor(Math.random() * articleLength) > 1
          ? Math.floor(Math.random() * articleLength)
          : 1;
      console.log(firstSource, secondSource, randomArticle);
      cy.wait(3000);
      cy.get(
        `.articles-wrapper > div:nth-child(${randomArticle}) > center > a`
      ).click();
    });

    it("Back to Second Nav", () => {
      cy.get(
        "#app > div > div > div:nth-child(2) > div:nth-child(1) > button"
      ).click();
    });

    it("Back to Home Page", () => {
      cy.get(
        "#app > div > div > div:nth-child(2) > div:nth-child(1) > button"
      ).click();
    });
  } else {
    it("Click Intended Article", () => {
      let articleLength = Cypress.$(".articles-wrapper").children().length;
      let randomArticle =
        Math.floor(Math.random() * articleLength) > 1
          ? Math.floor(Math.random() * articleLength)
          : 1;
      console.log(firstSource, randomArticle);
      cy.wait(3000);
      cy.get(
        `.articles-wrapper > div:nth-child(${randomArticle}) > center > a`
      ).click();
    });

    it("Back to Home Page", () => {
      cy.get(
        "#app > div > div > div:nth-child(2) > div:nth-child(1) > button"
      ).click();
    });
  }
});
