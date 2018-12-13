import {autorun, toJS} from 'mobx'
import * as React from 'react'
import * as reactDOM from 'react-dom'
import App from './app'
import './index.less'
import {StyleManager, StyleStore} from './libs/StyleStore'
import {throttled} from './libs/util'

const stylesStore = new StyleManager()
const head = document.querySelector('head') as HTMLHeadElement
const subnodeStyle = document.getElementById('styleref-subnode--active')
const overlay = document.getElementById('overlay')

const disposer = autorun(
  () => {
    const store = stylesStore.currentStyle
    if (store) {
      const styleEl = document.getElementById(store.name)
      if (styleEl) {
        styleEl.textContent = store.css
      }
    }
  },
  {delay: 100},
)

function updateStyle(styleStore: StyleStore) {
  let styleEl = document.getElementById(
    `${styleStore.name}`,
  ) as HTMLStyleElement
  if (styleEl == null) {
    styleEl = document.createElement('style')
    styleEl.setAttribute('id', styleStore.name)
    head.appendChild(styleEl)
  }
}

function subnodeHighlightCallback(selector: string, color: string) {
  if (subnodeStyle) {
    if (!selector) {
      subnodeStyle.textContent = ''
      return
    }

    subnodeStyle.textContent = `
    ${selector} {
    outline: -10px solid ${color};
    background-color:${color};
  }
    ${selector} > * {
      visibility: hidden;
    }
    `
  }
}

function subnodeClickCallback(selector: string) {
  if (subnodeStyle && selector) {
    const styleStore = stylesStore.setSelector(selector, selector)
    if (styleStore) {
      updateStyle(styleStore)
    }
  }
}

const body = document.body
body.addEventListener('click', e => {
  const el = e.target as HTMLElement
  if (el) {
    const styleref = el.closest('#styleref') as HTMLElement
    if (styleref) {
      return
    }
    const editable = el.closest('[data-styleref]') as HTMLElement
    if (editable && editable.dataset.styleref) {
      if (
        stylesStore.currentStyle &&
        editable.dataset.styleref === stylesStore.currentStyle.name
      ) {
        stylesStore.currentStyle = undefined
        return
      }
      const styleStore = stylesStore.setStyle(editable.dataset.styleref)
      if (styleStore) {
        updateStyle(styleStore)
      }
    } else {
      stylesStore.currentStyle = undefined
    }
  }
})
if (overlay) {
  const debouncedMoveTracker = throttled(100, trackMove)
  body.addEventListener('mousemove', debouncedMoveTracker)
  const debouncedLeaveTracker = throttled(100, trackMoveLeave)
  body.addEventListener('mouseleave', debouncedLeaveTracker)
  window.addEventListener('scroll', trackScroll)
}

let currentEditable: HTMLElement | undefined
function updateOverlay() {
  if (!overlay) {
    return
  }
  if (!currentEditable) {
    overlay.style.display = 'none'
    return
  }
  const {top, left, width, height} = currentEditable.getClientRects()[0]
  window.requestAnimationFrame(() => {
    Object.assign(overlay.style, {
      display: 'block',
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
    })
  })
}
function trackMove(e: MouseEvent) {
  if (!overlay) {
    return
  }
  const el = e.target as HTMLElement
  currentEditable = el.closest('[data-styleref]') as HTMLElement
  updateOverlay()
}

function trackMoveLeave(e: MouseEvent) {
  currentEditable = undefined
  updateOverlay()
}

function trackScroll(e: UIEvent) {
  updateOverlay()
}

reactDOM.render(
  <App
    store={stylesStore}
    subnodeHighlightCallback={subnodeHighlightCallback}
    subnodeClickCallback={subnodeClickCallback}
  />,
  document.getElementById('styleref'),
)
