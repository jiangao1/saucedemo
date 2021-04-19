import ProductPage from '../page_objects/ProductPage'

describe('Login', () => {
  const productPage = new ProductPage()

  beforeEach(() => {
    cy.visit('/')
  })

  describe('standard_user login assertions', () => {
    it('.should() - be able to login normally', () => {
      cy.login(Cypress.env('STANDARD_USER'), Cypress.env('PASSWORD'))
      cy.url().should('contain', '/inventory.html')
      cy.get('.title').should('have.text', 'Products')
    })
  })

  describe('locked_out_user should show lockout out warning', () => {
    it('.should show locked out warning', () => {
      cy.login(Cypress.env('LOCKED_OUT_USER'), Cypress.env('PASSWORD'))
      cy.get('[data-test=error]')
        .should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
        cy.get('.title').should('not.exist')
    })
  })

  describe('performance_glitch_user should be able to login', () => {
    it('.should be able to login after a few seconds delay', () => {
      cy.login(Cypress.env('PERFORMANCE_GLITCH_USER'), Cypress.env('PASSWORD'))
      cy.url().should('contain', '/inventory.html')
      cy.get('.title').should('have.text', 'Products')
    })
  })

  describe('logout', () => {
    it('.should be able to logout from products page', () => {
      cy.login(Cypress.env('STANDARD_USER'), Cypress.env('PASSWORD'))
      productPage.logout()
      cy.get('.login-box').should('be.visible')
    })
  })

})