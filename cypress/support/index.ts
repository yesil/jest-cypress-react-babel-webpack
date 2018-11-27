import 'cypress-testing-library'
import 'cypress-testing-library/add-commands'
import './commands'

export interface IUser {
  username: string
  password: string
}

declare global {
  namespace Cypress {
    // tslint:disable-next-line:interface-name
    interface Chainable<Subject = any> {
      createUser<E extends Node = HTMLElement>(
        overrides?: IUser,
      ): Chainable<IUser>
      loginAsNewUser<E extends Node = HTMLElement>(): Chainable<IUser>
      login<E extends Node = HTMLElement>(
        user: IUser,
      ): Chainable<Array<E | null>>
      assertLoggedInAs<E extends Node = HTMLElement>(
        user: IUser,
      ): Chainable<Array<E | null>>
      assertHome<E extends Node = HTMLElement>(): Chainable<Array<E | null>>
    }
  }
}
