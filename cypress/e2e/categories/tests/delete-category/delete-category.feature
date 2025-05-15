Feature: Delete Category Functionality

  @TC_033
  Scenario: Verify category deletion with confirmation and success message
    Given user navigates to the Categories page
    When user clicks the delete button for a category
    Then a confirmation modal should appear
    When the user confirms the deletion
    Then the category should be removed from the table
    And a success message should be displayed
