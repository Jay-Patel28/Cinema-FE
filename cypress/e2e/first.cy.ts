describe("My First Test", () => {
  beforeEach(() => {
    cy.log("Run !");
  });

  it("should click on Cinema Heading ", () => {
    cy.visit("/");
    cy.contains("Cinema").click();
    cy.url().should("include", "/");
  });
  it("should click on SignIn button ", () => {
    cy.visit("/");
    cy.contains("SignIn").click();
    cy.contains("Login");
  });
});
