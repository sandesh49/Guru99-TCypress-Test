describe('Request Quotation', () => {
  beforeEach(() => {
    // Visit the main page for insurance requests
    cy.visit('https://demo.guru99.com/insurance/v1/header.php');
    // Handle any uncaught exceptions to prevent test failures
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('Should request a quotation with valid data and save it', () => {
    // Navigate to the "Request Quotation" page
    cy.contains('Request Quotation').click();
    cy.screenshot()

    // Fill out the request quotation form with valid data
    cy.get('#quotation_breakdowncover').select('Roadside');
    cy.get('#quotation_vehicle_attributes_policystart_3i').select('16');
    
    // Calculate the premium
    cy.xpath('//input[@value="Calculate Premium"]').click();
    cy.screenshot()

    // Save the quotation
    cy.get('input[name="submit"]').click();

    // Assert the presence of identification number confirmation
    cy.xpath('//b[contains(text(), "Your identification number is")]', { timeout: 4000 }).should('be.visible');
    cy.screenshot()

    // Extract and store the identification number for later use
    cy.get('body').then(($body) => {
      const text = $body.text();
      const Regex = /Your identification number is :\s*(\d+)/;
      const match = text.match(Regex);
      if (match && match[1]) {
        const identificationNumber = match[1];
        cy.log('Identification Number:', identificationNumber);
        cy.wrap(identificationNumber).as('identificationNumber');
        cy.visit('https://demo.guru99.com/insurance/v1/header.php');

        // Retrieve the quotation using the stored identification number
        cy.xpath('//*[@id="ui-id-3"]', { timeout: 20000 }).should('be.visible').click();
        cy.get('@identificationNumber').then((identificationNumber) => {
          cy.get('input[name="id"]').type(identificationNumber);
          cy.get('#getquote').click();
          cy.screenshot()

          // Assert successful retrieval of the quotation
          cy.xpath('//font[@size="6px"]').should('contain', 'Retrieve Quotation');
        });
      } else {
        cy.log('No identification number found');
      }
    });
  });

  it('should not retrieve quotation with invalid identification number', () => {
    // Navigate to the "Retrieve Quotation" page
    cy.xpath('//*[@id="ui-id-3"]', { timeout: 2000 }).should('be.visible').click();
    const invalidIdentificationNumber = 'invalid_number';

    // Attempt to retrieve a quotation using an invalid identification number
    cy.fixture('example.json').then((randomNumber) => {
      cy.xpath('//input[@placeholder="identification number"]').type(randomNumber.toString());
    });
    cy.get('#getquote').click();
    cy.screenshot()

    // Assert the presence of an error message for invalid ID
    cy.xpath('//b[text()="Wrong Retrieve Quotation ID. Please Check..."]').should('contain', 'Wrong Retrieve Quotation ID. Please Check...', { timeout: 20000 }).should('be.visible');
  });

  it('should reset the form', () => {
    // Navigate to the "Request Quotation" page
    cy.contains('Request Quotation').click();

    // Fill out some fields in the form
    cy.get('#quotation_incidents').type('1');
    cy.get('#quotation_vehicle_attributes_registration').type('ABC123');

    // Reset the form
    cy.get('#resetquote').click();
    cy.screenshot()

    // Assert that the form fields are reset
    cy.get('#quotation_incidents').should('have.value', '');
    cy.get('#quotation_vehicle_attributes_registration').should('have.value', '');
  });
});
