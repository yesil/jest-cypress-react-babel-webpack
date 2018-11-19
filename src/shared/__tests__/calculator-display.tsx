import {render} from 'calculator-test-utils'
import React from 'react'
import CalculatorDisplay from '../calculator-display'

test('renders', () => {
  const {container} = render(<CalculatorDisplay value='0' />)
  expect(container.firstChild).toMatchSnapshot()
})
