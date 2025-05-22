Feature: Edit Category Functionality

  Background:
    Given Common Step: User navigates to the Categories page

  @smoke
  Scenario: Verify the Appearance of the Edit Button
    When the table of categories is displayed
    Then Each category should have an edit button beside it

  @smoke
  Scenario: Verify Opening the Form Upon Clicking the Edit Button
    When the user clicks the edit button for a category
    Then a form should open prefilled with the category name

  @TC_028
  Scenario: Verify Category Name Is Updated Successfully
    When the user edits the category and enters a new name
    Then The category should appear with the updated name in the table

  @TC_029
  Scenario: Verify Updating Category Name to an Existing One Is Not Allowed
    When the user attempts to edit a category name with an existing category name
    Then The system should prevent the edit and display a validation message

  @TC_030
  Scenario: Verify Cancelling Edit Does Not Save Changes
    When the user attempts to edit a category name and cancels the edit process
    Then the system should discard any changes and leave the category unchanged
