describe('Logout Test for Guru99 Insurance Site', () => {
  before(() => {
    // Visit the login page
    cy.visit('https://demo.guru99.com/insurance/v1/index.php');
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Login
    cy.fixture('credentials.json').then((credentials) => {
    cy.get('input[name="email"]').type(credentials.ValidEmail); // replace with valid email
    });

    cy.fixture('credentials.json').then((credentials) => {
      cy.get('input[name="password"]').type(credentials.ValidPass); // replace with valid password

    })
    cy.xpath('//input[@value="Log in"]').click()
    cy.screenshot()

    // Ensure the user is logged in by checking for the presence of the logout button or any other indicator
    cy.xpath('//h4').should('contain','deshsan46@gmail.com');
    cy.url().should('include', '/insurance/v1/header.php');
    
  });

  it('Should log out successfully', () => {
   // Click on the logout link (assuming there is a logout link after Login)
    cy.xpath('//input[@value="Log out"]').click()
    cy.screenshot()

    //Assure Navigated to login page after successfull logout
    cy.url().should('include', '/insurance/v1/index.php');

    // Verify that the user is logged out by checking the presence of the login form
    cy.get('input[name="email"]').should('exist');
    cy.screenshot()
  });
});
