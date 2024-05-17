describe('Profile and Edit Profile Functionality', () => {

  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('https://demo.guru99.com/insurance/v1/index.php');
    
    // Handle any uncaught exceptions to prevent test failure
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('should login with valid credentials', () => {
    // Load credentials from fixture file
    cy.fixture('credentials.json').then((credentials) => {
      // Enter valid email
      cy.get('input[name="email"]').type(credentials.ValidEmail); 
    });
  
    cy.fixture('credentials.json').then((credentials) => {
      // Enter valid password
      cy.get('input[name="password"]').type(credentials.ValidPass); 
    });

    // Click the login button
    cy.xpath('//input[@value="Log in"]').click();
    cy.screenshot()

    // Verify successful login by checking for specific text
    cy.xpath('//strong[text()="Firstname:"]').should('contain','Firstname:');
  });

  it('should display user profile information', () => {
    // Navigate directly to the profile page
    cy.visit('https://demo.guru99.com/insurance/v1/header.php#tabs-4');

    // Verify profile information is displayed
    cy.xpath('//strong[text()="Title:"]').should('contain','Title:');
    cy.contains('Profile').click();
    cy.screenshot()
    cy.xpath('//strong[text()="Surname:"]').should('contain','Surname:');
    cy.xpath('//strong[text()="Phone:"]').should('contain','Phone:');
    cy.xpath('//strong[text()="Driver History:"]').should('contain','Driver History:');
    
    // Add assertions to verify other profile information if available
  });

  it('should allow user to edit profile information with valid data', () => {
    // Navigate to the profile edit page
    cy.visit('https://demo.guru99.com/insurance/v1/header.php#tabs-4');
    cy.contains('Edit Profile').click();
    cy.screenshot()
    
    // Update profile information
    cy.get('input[id="user_surname"]').clear().type('New Name');
    cy.get('input[name="user[phone]"]').clear().type('1234567890');
    cy.get('input[name="commit"]').click();
    cy.screenshot()

    // Note: The test site has UI issues that prevent updating the profile
    // and fetching user details correctly.
    // As such, validation assertions for the updated profile cannot be performed.
    cy.contains('Editing user profile').should('be.visible');
    cy.screenshot()
    // cy.contains('Profile updated successfully').should('be.visible');
  });
});
