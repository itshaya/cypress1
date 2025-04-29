Feature: Display Categories in a Paginated Table

  @TC_001
  Scenario: Verify Displaying Categories with correct Timestamps format
    Given The user is logged in
    And navigates to the Categories page
    When the list of categories is loaded
    Then each category row should display a "Created At" timestamp in "YYYY-MM-DD HH:MM:SS" format

  @TC_002
  Scenario: :Verify that  user can navigate between pages using Next/Previous buttons
    Given The user is logged in
    And navigates to the Categories page
    When user clicks the "Next" or "Previous" button
    Then The system should navigate to the selected page and update the displayed categories

  @TC_003
  Scenario: Verify that user can control the number of items displayed per page
    Given The user is logged in
    And navigates to the Categories page
    When The user selects a specific number of items per page
    Then Then The system should display the selected number of categories per page
