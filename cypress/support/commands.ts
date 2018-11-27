import {userBuilder} from './generate'

Cypress.Commands.add('createUser', overrides => {
  const user = userBuilder(overrides)
  return cy
    .request({
      body: user,
      method: 'POST',
      url: 'http://localhost:3000/register',
    })
    .then(({body}) => body.user)
})

Cypress.Commands.add('login', user => {
  return cy
    .request({
      body: user,
      method: 'POST',
      url: 'http://localhost:3000/login',
    })
    .then(({body}) => {
      window.localStorage.setItem('token', body.user.token)
      return body.user
    })
})

Cypress.Commands.add('loginAsNewUser', () => {
  cy.createUser().then(user => {
    cy.login(user)
  })
})

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window()
    .its<any>('localStorage.token')
    .should('be.a', 'string')
    .getByTestId('username-display')
    .should('have.text', user.username)
})
