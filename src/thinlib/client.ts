const STYLES = 'styles'

let state: boolean = false
let styles: Text
const init = () => {
  if (document.head && !styles) {
    const styleElement = document.createElement('style')
    styles = document.createTextNode('')
    styleElement.appendChild(styles)
    document.head.appendChild(styleElement)
  }

  const listener = (e: StorageEvent) => {
    if (e.key === STYLES) {
      // tslint:disable-next-line:no-console
      console.log('new event')
      styles.textContent = e.newValue
    }
  }
  return (() => {
    if (state) {
      removeEventListener('storage', listener)
    } else {
      addEventListener('storage', listener, false)
    }
    state = !state
  })()
}
export {init}
