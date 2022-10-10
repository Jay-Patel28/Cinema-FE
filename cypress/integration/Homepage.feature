Feature: HomePage
    I want to see that baseurl lead to Homepage. Moreover, I 
    want to confirm that HomePage displays the Hot Release Show.

    Scenario: BaseUrl should lead to HomePage
        Given User navigate to the Website
        When User click on the Title
        Then Should display Hot Releses

    Scenario: When not logged in, the user should see SignIn and Register Page 
        Given User navigate to the Website 
        Then Should see Login and Register buttons

    Scenario: User should see Actors page link on HomePage 
        Given User navigate to the Website 
        Then User should see "Actors" link

    Scenario: User should see Movies page link on HomePage 
        Given User navigate to the Website
        Then User should see "Movies" link

