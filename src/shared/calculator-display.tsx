import * as React from 'react'
import styled from 'react-emotion'
import AutoScalingText from './auto-scaling-text'
import {getFormattedValue} from './utils'

const DisplayContainer = styled('div')`
  background: ${props => props.theme.displayBackgroundColor};
  color: ${props => props.theme.displayTextColor};
  flex: 1;
  font-size: 6em;
  line-height: 130px;
  position: relative;
`

class CalculatorDisplay extends React.Component<{value: string}> {
  public render() {
    const {value} = this.props
    const formattedValue = getFormattedValue(
      value,
      typeof window === 'undefined' ? 'en-US' : window.navigator.language,
    )

    return (
      <DisplayContainer {...this.props}>
        <AutoScalingText>{formattedValue}</AutoScalingText>
      </DisplayContainer>
    )
  }
}

export default CalculatorDisplay
