Feature: Display Categories in a Paginated Table

  Background:
    Given Common Step: User navigates to the Categories page

  @TC_001
  Scenario: Verify Displaying Categories with correct Timestamps format
    When the list of categories is loaded
    Then each category row should display a Created At timestamp in YYYY-M-DD HH:M:S format

  @TC_002
  Scenario: Verify that  user can navigate between pages using Next/Previous buttons
    When user clicks the Next or Previous button
    Then The system should navigate to the selected page and update the displayed categories

  @TC_003
  Scenario: Verify that user can control the number of items displayed per page
    When The user selects a specific number of items per page
    Then Then The system should display the selected number of categories per page

  @TC_005
  Scenario: Verify Table Should Remain Readable on Mobile or Resized Window
    When user resizes the browser window or uses a mobile device
    Then The table layout should remain readable and properly formatted

  @TC_007
  Scenario: Verify pagination buttons are disabled on boundary pages
    When The user is on the first page of categories
    Then The "Previous" button should be disabled
    When The user navigates to the last page
    Then The "Next" button should be disabled
