//#################  Given  #####################

// Background Start ------------
Given("A user is logged in", () => {
  cy.visit("/");
  cy.get("button").contains("SignIn").click();
  cy.get("[data-testid='email_input']").type("Jay");
  cy.get("[data-testid='pass_input']").type("Jay@28101998");
  cy.get("[data-testid='login_button']").click();
  cy.contains("You are logged in!");
});

Given("User is on Movies page only", () => {
  cy.visit("/movie");
  cy.url().should("contains", "movie");
});
// Background End ----------

Given("User is able to see the Search field", () => {
  cy.get('[data-testid="MovieSearchField"]');
});

Given("User is able to see the Load All movies button", () => {
  cy.get("button").contains("Or load All Movies");
});

Given("User is able to see all mandatory fields for adding a movie", () => {
  cy.get('[data-testid="movieNameInput"]');
  cy.get('[data-testid="movieViewsInput"]');
});

Given("User adds a new Actor {string}", (Fname: string) => {
  cy.get('[name="newactorfname"]').type(Fname);
  cy.get('[name="newactorlname"]').type("Kumar");
  cy.get('[name="newactorwealth"]').type("500");
  cy.get("button").contains("Add Actor").click();
});

Given("Added actor {string} is displayed on page", (Fname: string) => {
  cy.contains(Fname);
});

Given("User selects new Actor for movie", () => {
  cy.get('[type="checkbox"]').last().check();
});

Given(
  "User Adds new Movie {string} with views {string}",
  (MovieName: string, Views: string) => {
    cy.get('[data-testid="movieNameInput"]').type(MovieName);
    cy.get('[data-testid="movieViewsInput"]').type(Views);
  }
);

Given("New Movie {string} should be visible on Page", (MovieName: string) => {
  cy.get("button").contains("Or load All Movies").click();
  cy.contains(MovieName);
});

Given("User is able to see all actors on Actors Page", () => {
  cy.visit("/actor");
  cy.get("button").contains("Load All Actors").click();
});

Given("User is able to Delete last created actor", () => {
  cy.get('[data-testid="delete_actor"]').last().click();
});

Given("User is able to see all Movies on Movie Page", () => {
  cy.visit("/movie");
  cy.get("button").contains("Or load All Movies").click();
});

//#################  When  #####################
When("User types a Search", () => {
  cy.get('[data-testid="MovieSearchField"]').type("House");
});

When("User clicks Load All Movie button", () => {
  cy.get("button").contains("Or load All Movies").click();
});

When("User Adds a movie", () => {
  cy.get("button").contains("Add Movie").click();
});

When("User tries to Delete last created movie", () => {
  cy.get("button").contains("Delete").last().click();
});

When('Users clicks on "Learn More" button', () => {
  cy.contains("JPMovie");
  cy.get("button").contains("Learn More").last().click();
});

When("User attempts to Delete Last Movie visible", () => {
  cy.contains("JPMovie");
  cy.get('[data-testid="JPMovie"]').click();
});

//#################  Then  #####################
Then("User gets to see the results", () => {
  cy.contains("House of Dragons");
});

Then("User should be able see Hide All button", () => {
  cy.get("button").contains("Hide All");
});

Then("Movie addition success message should be displayed on screen", () => {
  cy.contains("Movie is Added successfully!");
});

Then("New Movie {string} should be visible on Page", (MovieName: string) => {
  cy.get("button").contains("Or load All Movies").click();
  cy.contains(MovieName);
});

Given("New Movie {string} should be added on Page", (MovieName: string) => {
  cy.contains(MovieName);
});

Then("User should see error informing to delete actorts first", () => {
  cy.contains("Delete the actors of this movie first");
});

Then("User should be on Movie information Page", () => {
  cy.url().should("contain", "/movie/");
});

Then("{string} Movie should be Deleted", (MovieName: string) => {
  cy.contains(`${MovieName} has been deleted successfully`);
});
