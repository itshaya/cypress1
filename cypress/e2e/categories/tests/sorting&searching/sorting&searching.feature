Feature: Sorting and Searching Functionality

  Background:
    Given user navigates to the Categories page

  @TC_010 @TC_011 @TC_012 @TC_013
  Scenario Outline: Verify categories are sorted correctly by <columnName> in <sortType> order
    When the user sorts the "<columnName>" column in <sortType> order
    Then categories should be displayed in <sortType> order according to "<columnName>"

    Examples:
      | columnName | sortType   |
      | Name       | descending |
      | CreatedAt  | ascending  |
      | CreatedAt  | descending |

  @TC_014
  Scenario: Verify search filters categories correctly
    When The user enters "cd" in the search field
    Then Only categories with names including "cd" should be displayed
