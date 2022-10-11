//#################  Given  #####################
Given("User navigate to the {string} Page", (page: string) => {
  cy.visit(`/${page}`);
});

//##################  When   ####################
When("User input Right Register Credentials", () => {
  //-------------------- Network Requests --------------------
  cy.intercept(
    {
      method: "POST",
      url: "api/Authenticate/register",
    },
    {
      statusCode: 200,
    }
  ).as("registerUser");

  cy.fixture("registerInputs").then((registerCreds) => {
    registerCreds.userName = (Math.random() + 1).toString(36).substring(7);
    cy.get("[data-testid='reg_username']").type(registerCreds.userName);
    cy.get("[data-testid='reg_email']").type(registerCreds.email);
    cy.get("[data-testid='reg_password']").type(registerCreds.password);
  });
  cy.get("[data-testid='reg_submit']").click();
});

When("User input Wrong Register Credentials", () => {
  cy.get("[data-testid='reg_username']").type("Jay");
  cy.get("[data-testid='reg_email']").type("notProperEmail");
  cy.get("[data-testid='reg_password']").type("notProperPass");
  cy.get("[data-testid='reg_submit']").click();
});

When("User input username which is already registered", () => {
  //-------------------- Network Requests --------------------
  cy.intercept(
    {
      method: "POST",
      url: "api/Authenticate/register",
    },
    {
      statusCode: 500,
      body: {
        message: "User already exists!",
      },
    }
  ).as("registerUser");
  cy.get("[data-testid='reg_username']").type("Jay");
  cy.get("[data-testid='reg_email']").type("jaypatel.ai98@gmail.com");
  cy.get("[data-testid='reg_password']").type("Jay@28101998");
  cy.get("[data-testid='reg_submit']").click();
});

// ##################  Then  ####################
Then("All login mandatory Register inputs should be visible", () => {
  cy.get("[data-testid='reg_username']");
  cy.get("[data-testid='reg_email']");
  cy.get("[data-testid='reg_password']");
  cy.get("[data-testid='reg_submit']");
});

Then("User should be Registered", () => {
  cy.contains("Registered successfully!");
});

Then("Registration error should be displayed", () => {
  cy.contains("One or more validation errors occurred.");
});

Then("User should not be Registered", () => {
  cy.contains("One or more validation errors occurred.");
});

Then("User already exists should be displayed", () => {
  cy.contains("User already exists!");
});
