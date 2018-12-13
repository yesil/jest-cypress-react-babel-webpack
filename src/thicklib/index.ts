import {autorun} from 'mobx'
import {Store} from './store'

const store = Store.create()
autorun(() => {
  if (store.css) {
    localStorage.setItem('styles', store.css)
  }
})
const container = store.subject('[data-container]')
container.style('display', 'flex')
container.mediaQuery('screen', '650px')
container.style('justify-content', 'flex-end')

const pod = store.subject('[data-pod]')
pod.style('flex', '33%')

const img = store.subject('[data-pod] img')
img.style('width', '100%')
img.style('height', '100%')
