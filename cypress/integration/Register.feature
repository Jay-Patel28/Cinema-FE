Feature: Register Functionality
    I want to test Register functionality. That Includes Register success as well as Register Failure.

  Scenario: User should be able to see all the Input fields for Register functionality
    Given User navigate to the "register" Page
    Then All login mandatory Register inputs should be visible

  Scenario: User should be able to Register when typed right credentials
    Given User navigate to the "Register" Page
    When User input Right Register Credentials
    Then User should be Registered

  Scenario: User should be able to see error when typed wrong credentials
    Given User navigate to the "Register" Page
    When User input Wrong Register Credentials
    Then User should not be Registered

  Scenario: User should not be able to Register when typed wrong/unacceptable credentials
    Given User navigate to the "Register" Page
    When User input Wrong Register Credentials
    Then Registration error should be displayed

  Scenario: When user tries to Register with already registered username, he/she should be shown proper error
    Given User navigate to the "Register" Page
    When User input username which is already registered
    Then User already exists should be displayed
