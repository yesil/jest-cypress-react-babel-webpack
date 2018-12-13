import * as React from 'react'
import { observer } from 'mobx-react'
import { Style } from '../libs/Style'
import { ChangeEvent } from 'react'

function update(style: Style, event: ChangeEvent<HTMLInputElement>) {
  if (style) {
    style.value = event.target.value
  }
}

function Rectangle<T>({
  label,
  color,
  styles,
  border = 'solid',
  children
}: {
  label?: string
  color: string
  styles?: {
    top: Style
    right: Style
    bottom: Style
    left: Style
  }
  border?: 'dashed' | 'dotted' | 'solid'
  children?: React.ReactNode
}) {
  const stlye: React.CSSProperties = {
    backgroundColor: color,
    border: `1px ${border}`
  }
  let inputEls
  if (styles) {
    const { top, right, bottom, left } = styles
    inputEls = [
      <div key="top" className="input1">
        <input value={top.value} onChange={event => update(top, event)} />
      </div>,
      <div key="right" className="input2">
        <input value={right.value} onChange={event => update(right, event)} />
      </div>,
      <div key="bottom" className="input3">
        <input value={bottom.value} onChange={event => update(bottom, event)} />
      </div>,
      <div key="left" className="input4">
        <input value={left.value} onChange={event => update(left, event)} />
      </div>
    ]
  }

  return (
    <div className="rectangle" style={stlye}>
      {label && <h4>{label}</h4>}
      {inputEls}
      {children}
    </div>
  )
}
export default observer(Rectangle)
