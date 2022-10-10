//#################  Given  #####################
Given("User navigate to the {string} Page", (page: string) => {
  cy.visit(`/${page}`);
});


//##################  When   ####################
When("User input Right Login Credentials", () => {
  cy.get("[data-testid='email_input']").type("Jay");
  cy.get("[data-testid='pass_input']").type("Jay@28101998");
  cy.get("[data-testid='login_button']").click();
});

When("User input Wrong Login Credentials", () => {
  cy.get("[data-testid='email_input']").type("Wrong");
  cy.get("[data-testid='pass_input']").type("Wrong");
  cy.get("[data-testid='login_button']").click();
});


// ##################  Then  ####################
Then("All login mandatory login inputs should be visible", () => {
  cy.get("[data-testid='email_input']");
  cy.get("[data-testid='pass_input']");
  cy.get("[data-testid='login_button']");
});

Then("User should be logged in", () => {
  cy.contains("You are logged in!");
});

Then("User should not be logged in", () => {
  cy.get("button").contains("SignIn");
});

Then("Login error should be displayed", () => {
  cy.contains("Username or Password Invalid!");
});

Then("SignOut button should be displayed", () => {
  cy.contains("Sign Out");
});
