import {ThemeProvider} from 'emotion-theming'
import * as React from 'react'
import {render as rtlRender} from 'react-testing-library'
import * as themes from '../src/kent/themes'

function render(ui: React.ReactNode, ...rest: any) {
  return rtlRender(
    <ThemeProvider theme={themes.dark}>{ui}</ThemeProvider>,
    ...rest,
  )
}

export * from 'react-testing-library'
// override the built-in render with our own
export {render}
