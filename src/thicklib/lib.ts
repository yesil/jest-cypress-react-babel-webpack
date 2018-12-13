import * as moment from 'moment'
const NAME = 'cssmode'
export const USERS = NAME + '.users'

export interface IUsers {
  [key: string]: {
    lastConnection: number
    selector?: string
  }
}

/**
 * Updates localStorage with the users that become available
 * @param username of an editor
 */
const joinUser = (username: string) => {
  const users = readFromStorage<IUsers>(USERS)
  users[username] = {lastConnection: moment.now()}
  updateStorage(USERS, users)
}

/**
 * Updates localStorage with the information that which user is editing which element/s
 * @param username of an editor
 * @param selector an element id or a selector that matches with multiple elements
 */
const selectElement = (username: string, selector: string) => {
  const users = readFromStorage<IUsers>(USERS)
  const user = users[username]
  user.selector = selector
  updateStorage(USERS, users)
}

const readFromStorage = <T>(key: string): T => {
  const usersStr = localStorage.getItem(key)
  const users = usersStr ? JSON.parse(usersStr) : {}
  return users
}
const updateStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export {joinUser, selectElement, readFromStorage, updateStorage}
