import ProductPage from '../page_objects/ProductPage'

// don't forget to test multiple browsers in concurrent
// don't forget to add a runner
// don't forget to create script in package.json

describe('Product', () => {
  const productPage = new ProductPage()

  beforeEach(() => {
    cy.visit('/')
    cy.loginAsStandard()
  })

  describe('Collapsable menu opens and its selections are present', () => {

    it('collapsable menu opens and its selections are present', () => {

      cy.get('#react-burger-menu-btn').click()
      cy.get('#inventory_sidebar_link').should('be.visible')
      cy.get('#about_sidebar_link').should('be.visible')
      cy.get('#logout_sidebar_link').should('be.visible')
      cy.get('#reset_sidebar_link').should('be.visible')
    })
  })

  describe('Sorting options for products properly sort all products', () => {

    it('sort by Name (A-Z)', () => {
      productPage.sortByNameAZ()
    })

    it('sort by Name (Z-A)', () => {
      productPage.sortByNameZA()
    })

    it('sort by Price (low to high)', () => {
      productPage.sortByPriceLH()
    })

    it('sort by Price (high to low)', () => {
      productPage.sortByPriceHL()
    })

  })

})