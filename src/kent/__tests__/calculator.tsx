import {render} from 'calculator-test-utils'
import * as React from 'react'
import Calculator from '../calculator'

test('renders', async () => {
  const x = 1
  render(<Calculator />)
})
