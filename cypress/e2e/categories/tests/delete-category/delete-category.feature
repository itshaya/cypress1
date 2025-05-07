Feature: Delete Category Functionality

  @TC_033
  Scenario: Verify Displaying Confirmation Message Upon Deletion
    Given user navigates to the Categories page
    When user clicks the delete button for a category
    Then a confirmation message should appear before the deletion is completed

  @smoke
  Scenario: Verify Category Is Deleted Successfully
    Given user navigates to the Categories page
    When the user deletes a category successfully
    Then the category should be removed from the table
  
  @TC_035
  Scenario: Verify Success Message Appears After Deletion
    Given user navigates to the Categories page
    When the user deletes a category successfully
    Then a success message should be displayed
