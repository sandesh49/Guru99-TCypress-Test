
describe('Testing different view ports for this project',()=>
  {

      before(()=>{
          console.log('running my test');
      } )
      
      beforeEach(()=>{
          cy.visit('https://demo.guru99.com/insurance/v1/index.php')
      })
      it('open in macbook -13',()=>
          {
                  cy.viewport('macbook-13')
                  cy.screenshot()
                  cy.wait(200)
          } )

          it('open in iphone-xr',()=>
              {
                      cy.viewport('iphone-xr')
                      cy.screenshot()
                      cy.wait(200)
              } )

})