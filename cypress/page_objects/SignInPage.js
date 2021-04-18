class SignInPage {
  fillUsername(value) {
    const field = cy.get('[data-test=username]')
    field.clear()
    field.type(value)

    return this
  }

  fillPassword(value) {
    const field = cy.get('[data-test=password]')
    field.clear()
    field.type(value)

    return this
  }

  submit() {
    const button = cy.get('[data-test=login-button]')
    button.click()
  }
}

export default SignInPage