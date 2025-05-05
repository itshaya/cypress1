Feature: Sorting and Searching Functionality

  @TC_010
  Scenario: Verify categories are sorted in ascending order by name
    Given The user is logged in
    And navigates to the Categories page
    When The user sorts the "Name" column in ascending order
    Then Categories should be displayed in ascending order according to name

  @TC_011
  Scenario: Verify categories are sorted in descending order by name
    Given The user is logged in
    And navigates to the Categories page
    When The user sorts the "Name" column in descending order
    Then Categories should be displayed in descending order according to name

  @TC_012
  Scenario: Verify categories are sorted in ascending order by "CreatedAt"
    Given The user is logged in
    And navigates to the Categories page
    When The user sorts the "CreatedAt" column in ascending order
    Then Categories should be displayed in ascending order according to CreatedAt

  @TC_013
  Scenario: Verify categories are sorted in descending order by "CreatedAt"
    Given The user is logged in
    And navigates to the Categories page
    When The user sorts the "CreatedAt" column in descending order
    Then Categories should be displayed in descending order according to CreatedAt

  @TC_014
  Scenario: Verify search filters categories correctly
    Given The user is logged in
    And navigates to the Categories page
    When The user enters "Cat11" in the search field
    Then Only categories with names including "Cat11" should be displayed
