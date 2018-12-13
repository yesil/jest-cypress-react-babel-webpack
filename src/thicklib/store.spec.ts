import {autorun} from 'mobx'
import {Store} from './store'

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('store', () => {
  test('styles', async () => {
    const store = Store.create()
    autorun(() => {
      expect(store.css).toMatchSnapshot()
      // tslint:disable-next-line:no-console
      console.log(store.css)
    })
    const subject = store.subject('[data-test]')
    subject.style('display', 'flex')
    subject.mediaQuery('screen', '650px')
    subject.style('justify-content', 'flex-end')
  })
})
