Feature: Login Functionality

  Scenario: Successful login
    Given User open the login page
    When User enter valid credentials
    And  click the login button
    Then User should be redirected to the categories page

  Scenario: login fails when enter invalid credentials
    Given User open the login page
    When User fill fields with invalid credentials
    And  click the login button
    Then The login should fail and I should not be redirected to the categories page

  Scenario: login fails when leave fields empty
    Given User open the login page
    When User try to leave the login fields empty
    And  click the login button
    Then The login should fail and see validation error messages
