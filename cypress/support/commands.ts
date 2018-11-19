import {
  Matcher,
  MatcherOptions,
  SelectorMatcherOptions,
} from 'dom-testing-library'

import {userBuilder} from './generate'

interface User {
  username: string
  password: string
}

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      createUser<E extends Node = HTMLElement>(
        overrides?: User,
      ): Chainable<User>
      loginAsNewUser<E extends Node = HTMLElement>(): Chainable<User>
      login<E extends Node = HTMLElement>(
        user: User,
      ): Chainable<Array<E | null>>
    }

    interface Chainable<Subject = any> {
      getByText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<E>
      getByTestId<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E>
      queryByTestId<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E | null>
      queryByTestId<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>
    }
  }
}
// declare const cy: Cypress.Chainable<undefined>

Cypress.Commands.add('createUser', (overrides) => {
  const user = userBuilder(overrides)
  return cy
    .request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })
    .then(({body}) => body.user)
})

Cypress.Commands.add('login', (user) => {
  return cy
    .request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      body: user,
    })
    .then(({body}) => {
      window.localStorage.setItem('token', body.user.token)
      return body.user
    })
})

Cypress.Commands.add('loginAsNewUser', () => {
  cy.createUser().then((user) => {
    cy.login(user)
  })
})

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', (user) => {
  cy.window()
    .its('localStorage')
    .should('be.a', 'string')
    .getByTestId('username-display')
    .should('have.text', user.username)
})
