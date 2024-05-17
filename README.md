Automated Testing Assessment--------
This repository contains scripts for automated testing of various functionalities on the Guru99 Insurance site. Below is an overview of each script included in this assessment:

**Note - some of the test cases in login, user profile, and Edit profile could not be covered because of UI issues on the test site. There were some functional and UI issues that blocked me from writing complete test cases for login , profile and Edit profile.**


Scripts Overview

1. Login.cy.js
This script contains tests related to the login functionality of the Guru99 Insurance site. It includes tests to:
•	Verify the visibility of the login form elements.
•	Test logging in with valid credentials and ensure redirection to the correct page.
•	Validate error handling for invalid login attempts.
•	Check functionality with empty email and password fields.

3. Random.cy.js
This script focuses on generating and logging a random number. It:
•	Generates a random number within a specified range.
•	Writes the generated number to a fixture file.
•	Reads and logs the content of the fixture file to verify the stored random number.

5. RequestRetrieveQuote.js
This script handles the quotation request and retrieval process on the Guru99 Insurance site. It includes tests to:
•	Request a quotation with valid data and verify successful submission.
•	Capture and store the identification number generated during the quotation request.
•	Attempt to retrieve a quotation using both valid and invalid identification numbers.
•	Test the reset functionality of the quotation request form.

7. UserProfile.cy.js
The UserProfile.cy.js script focuses on testing the user profile and profile editing functionalities. It includes tests to:
•	Login with valid credentials and verify successful login.
•	Navigate to the user profile page and validate the display of user information.
•	Test the ability to edit profile information with valid data and ensure the update process completes successfully.

9. Logout.cy.js
This script verifies the logout functionality of the Guru99 Insurance site. It:
•	Logs in using valid credentials before each test to ensure a valid session.
•	Tests the logout process by clicking the logout button and verifies redirection to the login page.
•	Confirms that the login form is visible after successful logout.
________________________________________


**Key points-
-Used Regex to Extract dynamic Identification number, used Wrap() to create an alias of identification number to use as dynamic input data for valid identification number 
-use of fixture as static data set for Credentials 
-Use of fixture to generate Random number which is used as dynamic input data for invalid identification number**


Commands to execute Test files (Need to Execute Test files As mentioned to use Dynamic RandomNumber for invalid Identification number)

**-npx cypress run --spec "cypress/e2e/login.cy.js,cypress/e2e/Random.cy.js,cypress/e2e/RequestRetrieveQuote.js,cypress/e2e/UserProfile.cy.js,cypress/e2e/Logout.cy.js"**

The above command runs Scripts in headless mode which in default uses "Electron 118" as the default browser 

Command to execute in Chrome browser in headless mode 

**-npx cypress run --spec "cypress/e2e/login.cy.js,cypress/e2e/Random.cy.js,cypress/e2e/RequestRetrieveQuote.js,cypress/e2e/UserProfile.cy.js,cypress/e2e/Logout.cy.js" --browser chrome**




These scripts cover essential functionalities of the Guru99 Insurance site, including login, quotation requests, profile management, and logout. Each script is designed to validate specific user interactions and ensure the application behaves as expected under various scenarios.

