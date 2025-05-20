Feature: Add Category Functionality

  Background:
    Given Common Step: User navigates to the Categories page


  @TC_020
  Scenario: Verify user can add a category successfully and see confirmation
    When user clicks the Add Category button
    Then The form for adding a new category should open
    When fills in the category name and submits
    Then the new category should appear in the categories list
    And A success message should appear

  @TC_024
  Scenario: Verify Adding Duplicate Category Name is Not Allowed
    And there is a one category exist at least
    When user clicks the Add Category button
    And the user tries to add a category with an existing name
    Then system should display a message indicating that the category name already exists

  @TC_025
  Scenario: Verify Cancellation of Adding Category Does Not Save Changes
    When user clicks the Add Category button
    And the user cancels the adding process
    Then The category should not be added
