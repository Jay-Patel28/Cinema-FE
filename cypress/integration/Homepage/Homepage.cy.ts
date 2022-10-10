const { Given, When, Then } = require("cypress-cucumber-preprocessor/steps");

//#################  Given  #####################
Given("User navigate to the Website", () => {
  cy.visit("/");
});

Given("User clicks on {string} button", (button: any) => {
  cy.get("button").contains(`${button}`).click();
});

//##################  When   ####################
When("User click on the Title", () => {
  cy.contains("Cinema").click();
  cy.url().should("include", "/");
});

// ##################  Then  ####################
Then("Should display Hot Releses", () => {
  cy.contains("Hot Release this week");
  cy.contains("On HBO");
});

Then("Should see Login and Register buttons", () => {
  cy.get("button").contains("SignIn");
  cy.get("button").contains("Register");
});

Then("User should see {string} link", (page: string) => {
  cy.get("a").contains(`${page}`);
});
