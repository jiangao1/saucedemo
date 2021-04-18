import ProductPage from '../page_objects/ProductPage'

describe('Login', () => {
  const productPage = new ProductPage()

  beforeEach(() => {
    cy.visit('/')
  })

  describe('standard_user login assertions', () => {
    it('.should() - be able to login normally', () => {
      cy.login('standard_user', 'secret_sauce')
      cy.url().should('contain', '/inventory.html')
    })
  })

  describe('locked_out_user should show lockout out warning', () => {
    it('.should show locked out warning', () => {
      cy.login('locked_out_user', 'secret_sauce')
      cy.get('[data-test=error]')
        .should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    })
  })

  describe('performance_glitch_user should be able to login', () => {
    it('.should be able to login after a few seconds delay', () => {
      cy.login('performance_glitch_user', 'secret_sauce')
      cy.url().should('contain', '/inventory.html')
    })
  })

  // write some .ignore file
  describe('logout', () => {
    it('.should be able to logout from products page', () => {
      cy.loginAsStandard()
      productPage.logout()
      cy.get('.login-box').should('be.visible')
    })
  })

})