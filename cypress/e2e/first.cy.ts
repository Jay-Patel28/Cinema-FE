describe("My First Test", () => {
  beforeEach(() => {
    cy.log("Run !");
    cy.visit("/");
  });

  it("should click on Cinema Heading ", () => {
    cy.contains("Cinema").click();
    cy.url().should("include", "/");
  });
  it("should show Hot Release thsi week", () => {
    cy.contains("Hot Release this week");
  });
});
