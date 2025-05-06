Feature: Add Category Functionality

  @TC_018
  Scenario: Verify Clicking the "Add Category" button opens the form
    Given The user is logged in
    And navigates to the Categories page
    When user clicks the Add Category button
    Then The form for adding a new category should open

  @TC_019
  Scenario: Verify Add Category Without Name Isn’t Allowed
    Given The user is logged in
    And navigates to the Categories page
    When user clicks the Add Category button
    And leaves the category name field empty and clicks submit
    Then an error message should appear

  @TC_020
  Scenario: Verify Adding Category Successfully
    Given The user is logged in
    And navigates to the Categories page
    When user clicks the Add Category button
    And fills in the category name and submits
    Then the new category should appear in the categories list
  
  @TC_021
  Scenario: Verify Success Message Displayed When Adding Category Successfully
    Given The user is logged in
    And navigates to the Categories page
    When user clicks the Add Category button
    And the user successfully adds a new category
    Then A success message should appear
 
  @TC_024
  Scenario: Verify Adding Duplicate Category Name is Not Allowed
    Given The user is logged in
    And navigates to the Categories page
    When user clicks the Add Category button
    And the user tries to add a category with an existing name
    Then system should display a message indicating that the category name already exists
  
  @TC_025
  Scenario: Verify Cancellation of Adding Category Does Not Save Changes
    Given The user is logged in
    And navigates to the Categories page
    When user clicks the Add Category button
    And the user cancels the adding process
    Then The category should not be added
