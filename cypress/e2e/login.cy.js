describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('https://demo.guru99.com/insurance/v1/index.php');
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('Should display login form', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.xpath('//input[@name="submit"]').should('be.visible');
    cy.screenshot()
  });

  it('Should be able to login with valid credentials', () => {
    cy.fixture('credentials.json').then((credentials) => {
      cy.get('input[name="email"]').type(credentials.ValidEmail); // replace with valid email
      cy.get('input[name="password"]').type(credentials.ValidPass); // replace with valid password
    });
    cy.xpath('//input[@class="btn btn-default"]').click();
    cy.screenshot()

    // Assert that user is redirected after successful login
    cy.url().should('include', 'header.php');
    cy.wait(5000);
  });

  it('Should display error message for invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.xpath('//input[@value="Log in"]').click();
    cy.screenshot()
    // Assert that error message is displayed
    cy.contains('Enter your Email address and password correct').should('be.visible');
  });

  it('Allow login for empty email and password fields for test website', () => {
    cy.xpath('//input[@name="submit"]').click();
    cy.screenshot()
    cy.url().should('include', 'header.php');
  });
});
