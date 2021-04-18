// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import SignInPage from "../page_objects/SignInPage"
const signIn = new SignInPage()

Cypress.Commands.add('login', (username, password) => {
  signIn.fillUsername(username)
  signIn.fillPassword(password)
  signIn.submit()
})

Cypress.Commands.add('loginAsStandard', () => {
  signIn.fillUsername('standard_user')
  signIn.fillPassword('secret_sauce')
  signIn.submit()
})