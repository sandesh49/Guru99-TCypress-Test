describe('Generate Random Number', () => {
  it('should generate and log a random number', () => {
    // Function to generate a random number
    function generateRandomNumber() {
      return Math.floor(Math.random() * 1000000); // Adjust range as needed
    }

    // Generate a random number
    const randomNumber = generateRandomNumber();

    // Write the random number to a fixture file
    cy.writeFile('cypress/fixtures/example.json', { randomNumber }).then(() => {
      // Log the random number
      cy.log('Random Number:', randomNumber);

      // Read the fixture file to verify the content
      cy.readFile('cypress/fixtures/example.json').then((content) => {
        cy.log('Fixture Content:', content);
      });
    });
  });
});