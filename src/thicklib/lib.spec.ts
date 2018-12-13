import {IUsers, joinUser, readFromStorage, selectElement, USERS} from './lib'

jest.mock('moment', () => {
  return {
    now: jest.fn(() => 1544605377670),
  }
})

describe('thin library', () => {
  test('two users join and select an element', () => {
    joinUser('john')
    selectElement('john', 'image1')
    joinUser('joe')
    selectElement('joe', 'image2')
    const users = readFromStorage<IUsers>(USERS)
    expect(users).toMatchSnapshot()
  })

  test('set style', () => {
    //
  })

  test('init styles from localStorage', () => {
    //
  })
})
