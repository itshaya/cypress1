Feature: Display Categories in a Paginated Table

  @TC_001
  Scenario: Verify Displaying Categories with correct Timestamps format
    Given The user is logged in
    And navigates to the Categories page
    When the list of categories is loaded
    Then each category row should display a "Created At" timestamp in "YYYY-M-DD HH:M:S" format

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

  @TC_004
  Scenario: Verify Table Should Remain Readable on Mobile or Resized Window
    Given The user is logged in
    And navigates to the Categories page
    When user resizes the browser window or uses a mobile device
    Then The table layout should remain readable and properly formatted

  @TC_005
  Scenario: Verify Next button is disabled on the last page
    Given The user is logged in
    And navigates to the Categories page
    When The user reaches the last page
    Then The "Next" button should be disabled

  @TC_006
  Scenario: Verify Previous button is disabled on the first page
    Given The user is logged in
    And navigates to the Categories page
    When The user is on the first page of categories
    Then The "Previous" button should be disabled
  