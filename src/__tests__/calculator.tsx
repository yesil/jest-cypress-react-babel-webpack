import {render} from 'calculator-test-utils'
import React from 'react'
import loadable from 'react-loadable'
import Calculator from '../calculator'

test('renders', async () => {
  await loadable.preloadAll()
  render(<Calculator />)
})
