import { emptyUserFields, invalidUser, validUser } from "../../fixtures/data";
import login from "../../pageObjects/actions";

describe("Testing login page ", () => {
   beforeEach(() => {
      cy.visit('https://product-manager-1903f.web.app/sign-in');
   });
    
   it('should login successfully with valid credentials  ', () => {
      login(validUser.username , validUser.password);
      cy.url().should('include', '/categories')
   });

   it('should login fails due to invalid credentials ', () => {
      login(invalidUser.username , invalidUser.password);
      cy.url().should('not.contain' ,'/categories')
   });
   
   it('should login fails due to empty fields ', () => {
      login(emptyUserFields.username , emptyUserFields.password);
      cy.contains('Username is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
   });
});

