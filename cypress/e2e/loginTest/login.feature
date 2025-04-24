Feature: Login Functionality

  Scenario: Successful login
    Given I open the login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the categories page

  Scenario: login fails when enter invalid credentials
    Given I open the login page
    When I fill fields with invalid credentials
    And I click the login button
    Then The login should fail and I should not be redirected to the categories page

  Scenario: login fails when leave fields empty
    Given I open the login page
    When I try to leave the login fields empty
    And I click the login button
    Then The login should fail and see validation error messages
