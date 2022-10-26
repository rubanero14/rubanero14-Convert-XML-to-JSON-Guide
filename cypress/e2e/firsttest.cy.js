describe("Visit RSS Feed Home Page", () => {
  it("Visit the page", () => {
    cy.visit("https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/");
  });

  it("Open first Source", () => {
    cy.wait(5000);
    cy.get("img.logo[src='bw-logo.png'")
      .should("be.visible")
      .click({ multiple: false });
  });

  it("Open Second Source", () => {
    cy.wait(5000);
    cy.get("span.text-secondary.title")
      .contains("Dividend News")
      .should("be.visible")
      .click({ multiple: false });
  });

  it("Back to Home Page", () => {
    cy.get("button.btn-secondary.w-100")
      .contains("Back")
      .should("be.visible")
      .click();
  });
});
