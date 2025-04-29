Feature: Display Categories in a Paginated Table

  Scenario: Verify Displaying Categories with correct Timestamps format
    Given The user is logged in
    And navigates to the Categories page
    When the list of categories is loaded
    Then each category row should display a "Created At" timestamp in "YYYY-MM-DD HH:MM:SS" format

  Scenario:
