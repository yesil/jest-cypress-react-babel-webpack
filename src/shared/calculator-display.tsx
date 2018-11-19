import PropTypes from 'prop-types'
import React from 'react'
import styled from 'react-emotion'
import AutoScalingText from './auto-scaling-text'
import {getFormattedValue} from './utils'

const DisplayContainer = styled.div(({theme}) => ({
  color: theme.displayTextColor,
  background: theme.displayBackgroundColor,
  lineHeight: '130px',
  fontSize: '6em',
  flex: '1',
  position: 'relative',
}))

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
