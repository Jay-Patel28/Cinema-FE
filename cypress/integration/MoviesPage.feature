Feature: We want to verify if all the functionalities of our Movies page is Working or not

  Background: A user should be logged in, in order to Explore Movies page.
    Given A user is logged in
    Given User is on Movies page only

  Scenario: Movie Search filed should be available to user and User should be able to type in that field
    Given User is able to see the Search field
    When User types a Search
    Then User gets to see the results

  Scenario: User should be able to see Load All movies button and clicking button should consequtively dispplay Hide All button
    Given User is able to see the Load All movies button
    When User clicks Load All Movie button
    Then User should be able see Hide All button

  Scenario: Add a new Movie along with adding a new Actor
    Given User is able to see all mandatory fields for adding a movie
    Given User adds a new Actor "Cypress"
    Given Added actor "Cypress" is displayed on page
    Given User selects new Actor for movie
    Given User Adds new Movie "JPMovie" with views "500"
    When User Adds a movie
    Then Movie addition success message should be displayed on screen
    Then New Movie "JPMovie" should be added on Page

  Scenario: Error should be displayed when user tries to Delete a Movie when it consists of actors
    Given New Movie "JPMovie" should be visible on Page
    When User tries to Delete last created movie
    Then User should see error informing to delete actorts first

  Scenario: User opens movie Page of newly created movie
    Given New Movie "JPMovie" should be visible on Page
    When Users clicks on "Learn More" button
    Then User should be on Movie information Page

  Scenario: Deleting actor should allow User to Delete the Movie
    Given User is able to see all actors on Actors Page
    And User is able to Delete last created actor
    And User is able to see all Movies on Movie Page
    When User attempts to Delete Last Movie visible
    Then "JPMovie" Movie should be Deleted
