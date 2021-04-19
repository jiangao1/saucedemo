import faker from 'faker'
import promisify from 'cypress-promise'
import ProductPage from '../page_objects/ProductPage'
import CartPage from '../page_objects/CartPage'
import InfoPage from '../page_objects/InfoPage'
import OverviewPage from '../page_objects/OverviewPage'
import CompletePage from '../page_objects/CompletePage'

describe('Order completion and cancellation', () => {
  const productPage = new ProductPage()
  const cartPage = new CartPage()
  const infoPage = new InfoPage()
  const overviewPage = new OverviewPage()
  const completePage = new CompletePage()

  beforeEach(function() {
    cy.visit('/')
    cy.login(Cypress.env('STANDARD_USER'), Cypress.env('PASSWORD'))
    cy.fixture('products.json').then(function (data) {
      this.productsJSON = data
    })
  })
  
  describe('Check out flow from start to finish', function() {
    it('Can add two items, checkout, verify price and complete order', async function() {
      const productsJSON = this.productsJSON

      // add two products to shopping cart
      addTwoProductsToCart()

      // go to cart and checkout
      gotoCartCheckout()

      // checkout: your information
      fillUserInfo()

      // checkout: overview
      await verifyPriceTotal(productsJSON)

      // checkout: complete
      verifyComplete(completePage)
    })
  })

  describe('Cancel order', function() {
    it('should be able to cancel order from the product page ', function() {
      // add two products to shopping cart
      addTwoProductsToCart()

      cy.get(productPage.sauceLabsBackPackRemoveBtn).click()
      cy.get(productPage.sauceLabsBikeLightRemoveBtn).click()
      cy.get(productPage.cartBadge).should('not.exist')
    })

    it('should be able to cancel order from the shopping cart page', function() {
      // add two products to shopping cart
      addTwoProductsToCart()

      // go to cart
      cy.get(productPage.cartLink).click()

      cy.get(productPage.sauceLabsBackPackRemoveBtn).click()
      cy.get(productPage.sauceLabsBikeLightRemoveBtn).click()
      cy.get(productPage.cartBadge).should('not.exist')
    })
  })


  function addTwoProductsToCart() {
    cy.get(productPage.sauceLabsBackPackCartBtn).click()
    cy.get(productPage.cartBadge).should('have.text','1')
    cy.get(productPage.sauceLabsBikeLightCartBtn).click()
    cy.get(productPage.cartBadge).should('have.text','2')
  }

  function gotoCartCheckout() {
    cy.get(productPage.cartLink).click()
    cy.get(cartPage.title)
      .should('have.text', 'Your Cart')
    cartPage.checkout()
  }

  function fillUserInfo() {
    // use of faker module to generate user info on the fly
    const userInfo = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      postalCode: faker.address.zipCode()
    }

    infoPage.fillInfo(userInfo)
    cy.get('[data-test=continue]').click()
  }

  async function verifyPriceTotal(productsJSON) {
    const expectedItemTotal = 
      Number(productsJSON[0].inventory_item_price.replace(/\$/g, '')) +
      Number(productsJSON[1].inventory_item_price.replace(/\$/g, ''))

    // assert item totals without tax
    cy.get(overviewPage.subtotal).should('have.text', `Item total: $${expectedItemTotal}`)

    // assert tax amount exists, we don't know the expected tax rate, but it should be visible
    cy.get(overviewPage.tax).should('be.visible')

    // extracting tax label
    const taxLabel = await promisify(cy
      .get(overviewPage.tax)
      .then($el => $el.text()))
    const expectedTotal = expectedItemTotal + Number(taxLabel.split('$')[1])

    // assert total price including tax
    cy.get(overviewPage.total).should('have.text', `Total: $${expectedTotal}`)
    cy.get('[data-test=finish]').click()
  }

  function verifyComplete() {
    cy.get(completePage.title).should('have.text', 'Checkout: Complete!')
    cy.get(completePage.header).should('have.text', 'THANK YOU FOR YOUR ORDER')
    cy.get(completePage.completeIcon).should('be.visible')
    cy.get(productPage.cartBadge).should('not.exist')
  }
})