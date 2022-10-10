Feature: Login / SignIn Functionality

    I want to test Sign In functionality. That Includes SignIn success as well as SignIn Failure.

    Scenario: User should be able to see all the Input fields for Login functionality
        Given User navigate to the "Login" Page
        Then All login mandatory login inputs should be visible

    Scenario: User should be able to Log in when typed right credentials
        Given User navigate to the "Login" Page
        When User input Right Login Credentials
        Then User should be logged in

    Scenario: User should be able to see error when typed wrong credentials
        Given User navigate to the "Login" Page
        When User input Wrong Login Credentials
        Then User should not be logged in    

    Scenario: User should not be able to Log in when typed wrong credentials
        Given User navigate to the "Login" Page
        When User input Wrong Login Credentials
        Then Login error should be displayed

    Scenario: On successfull SignIn, user should be able to see the SignOut button
        Given User navigate to the "Login" Page
        When User input Right Login Credentials
        Then User should be logged in
        Then SignOut button should be displayed