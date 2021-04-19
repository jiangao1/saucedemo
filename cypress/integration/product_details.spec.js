import promisify from 'cypress-promise'
import ProductPage from '../page_objects/ProductPage'
import SingleProductPage from '../page_objects/SingleProductPage'

describe('Product details', function() {

  const productPage = new ProductPage()
  const actualProduct = productPage.getBackpackDetails()
  const singleProductPage = new SingleProductPage()

  beforeEach(function() {
    cy.visit('/')
    cy.login(Cypress.env('STANDARD_USER'), Cypress.env('PASSWORD'))
    cy.fixture('products.json').then(function (data) {
      this.productsJSON = data
    })
  })
  
  it('all detail of a product can display in the product page', function () {
    const productsJSON = this.productsJSON

    // assert item name
    cy.get(actualProduct.name)
      .should('have.text', productsJSON[0].inventory_item_name)

    // assert item desc
    cy.get(actualProduct.desc)
      .should('have.text', productsJSON[0].inventory_item_desc)

    // assert item price
    cy.get(actualProduct.price)
      .should('have.text', productsJSON[0].inventory_item_price)

    // assert item img
    cy.get(actualProduct.img)
      .should('be.visible')
  })

  it('all detail of a product can display in an individual product page', function () {
    const productsJSON = this.productsJSON
    cy.get(actualProduct.name).click()

    // assert item name
    cy.get(singleProductPage.productName)
      .should('have.text', productsJSON[0].inventory_item_name)

    // assert item desc
    cy.get(singleProductPage.productDesc)
      .should('have.text', productsJSON[0].inventory_item_desc)

    // assert item price
    cy.get(singleProductPage.productPrice)
      .should('have.text', productsJSON[0].inventory_item_price)

    // assert item img
    cy.get(singleProductPage.productImg)
      .should('be.visible')
  })
})