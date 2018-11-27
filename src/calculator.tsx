import * as React from 'react'
import CalculatorDisplay from './shared/calculator-display'
const styles = require('./calculator.module.css')

class CalculatorKey extends React.Component<{
  onPress: () => void
  className: string
}> {
  public render() {
    const {onPress, className = '', ...props} = this.props

    return (
      <button
        onClick={onPress}
        className={`${styles.calculatorKey} ${className}`}
        {...props}
      />
    )
  }
}

type Operator = '*' | '+' | '-' | '/' | '=' | '%'
type FromOperators = {
  [k in Operator]: (prevValue: number, nextValue: number) => number
}
const CalculatorOperations: FromOperators = {
  '%': (prevValue: number, nextValue: number) => prevValue % nextValue,
  '*': (prevValue: number, nextValue: number) => prevValue * nextValue,
  '+': (prevValue: number, nextValue: number) => prevValue + nextValue,
  '-': (prevValue: number, nextValue: number) => prevValue - nextValue,
  '/': (prevValue: number, nextValue: number) => prevValue / nextValue,
  '=': (prevValue: number, nextValue: number) => nextValue,
}

class Calculator extends React.Component<
  {},
  {
    displayValue: string
    operator: Operator | null
    value: number | null
    waitingForOperand: boolean
  }
> {
  public state = {
    displayValue: '0',
    operator: null,
    value: null,
    waitingForOperand: false,
  }

  public clearAll() {
    this.setState({
      displayValue: '0',
      operator: null,
      value: null,
      waitingForOperand: false,
    })
  }

  public clearDisplay() {
    this.setState({
      displayValue: '0',
    })
  }

  public clearLastChar() {
    const {displayValue} = this.state

    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0',
    })
  }

  public toggleSign() {
    const {displayValue} = this.state
    const newValue = parseFloat(displayValue) * -1

    this.setState({
      displayValue: String(newValue),
    })
  }

  public inputPercent() {
    const {displayValue} = this.state
    const currentValue = parseFloat(displayValue)

    if (currentValue === 0) {
      return
    }

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100

    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
    })
  }

  public inputDot() {
    const {displayValue} = this.state

    if (!/\./.test(displayValue)) {
      this.setState({
        displayValue: `${displayValue}.`,
        waitingForOperand: false,
      })
    }
  }

  public inputDigit(digit: number) {
    const {displayValue, waitingForOperand} = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      })
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      })
    }
  }

  public performOperation(nextOperator: Operator) {
    const {value, displayValue, operator} = this.state
    const inputValue = parseFloat(displayValue)

    if (value == null) {
      this.setState({
        value: inputValue,
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator as Operator](
        currentValue,
        inputValue,
      )

      this.setState({
        displayValue: String(newValue),
        value: newValue,
      })
    }

    this.setState({
      operator: nextOperator,
      waitingForOperand: true,
    })
  }

  public handleKeyDown = (event: KeyboardEvent) => {
    let {key} = event

    if (key === 'Enter') {
      key = '='
    }

    const operator: Operator = key as Operator

    if (/\d/.test(key)) {
      event.preventDefault()
      this.inputDigit(parseInt(key, 10))
    } else if (operator && operator in CalculatorOperations) {
      event.preventDefault()
      this.performOperation(operator)
    } else if (key === '.') {
      event.preventDefault()
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault()
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()

      if (this.state.displayValue === '0') {
        this.clearAll()
      } else {
        this.clearDisplay()
      }
    }
  }

  public componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  public render() {
    const {displayValue} = this.state

    const clearDisplay = displayValue !== '0'
    const clearText = clearDisplay ? 'C' : 'AC'
    return (
      <div className={styles.calculator}>
        <CalculatorDisplay value={displayValue} />
        <div className={styles.calculatorKeypad}>
          <div className={styles.inputKeys}>
            <div className={styles.functionKeys}>
              <CalculatorKey
                className={styles.keyClear}
                onPress={() =>
                  clearDisplay ? this.clearDisplay() : this.clearAll()
                }
              >
                {clearText}
              </CalculatorKey>
              <CalculatorKey
                className={styles.keySign}
                onPress={() => this.toggleSign()}
              >
                ±
              </CalculatorKey>
              <CalculatorKey
                className={styles.keyPercent}
                onPress={() => this.inputPercent()}
              >
                %
              </CalculatorKey>
            </div>
            <div className={styles.digitKeys}>
              <CalculatorKey
                className={styles.key0}
                onPress={() => this.inputDigit(0)}
              >
                0
              </CalculatorKey>
              <CalculatorKey
                className={styles.keyDot}
                onPress={() => this.inputDot()}
              >
                ●
              </CalculatorKey>
              <CalculatorKey
                className={styles.key1}
                onPress={() => this.inputDigit(1)}
              >
                1
              </CalculatorKey>
              <CalculatorKey
                className={styles.key2}
                onPress={() => this.inputDigit(2)}
              >
                2
              </CalculatorKey>
              <CalculatorKey
                className={styles.key3}
                onPress={() => this.inputDigit(3)}
              >
                3
              </CalculatorKey>
              <CalculatorKey
                className={styles.key4}
                onPress={() => this.inputDigit(4)}
              >
                4
              </CalculatorKey>
              <CalculatorKey
                className={styles.key5}
                onPress={() => this.inputDigit(5)}
              >
                5
              </CalculatorKey>
              <CalculatorKey
                className={styles.key6}
                onPress={() => this.inputDigit(6)}
              >
                6
              </CalculatorKey>
              <CalculatorKey
                className={styles.key7}
                onPress={() => this.inputDigit(7)}
              >
                7
              </CalculatorKey>
              <CalculatorKey
                className={styles.key8}
                onPress={() => this.inputDigit(8)}
              >
                8
              </CalculatorKey>
              <CalculatorKey
                className={styles.key9}
                onPress={() => this.inputDigit(9)}
              >
                9
              </CalculatorKey>
            </div>
          </div>
          <div className={styles.operatorKeys}>
            <CalculatorKey
              className={styles.keyDivide}
              onPress={() => this.performOperation('/')}
            >
              ÷
            </CalculatorKey>
            <CalculatorKey
              className={styles.keyMultiply}
              onPress={() => this.performOperation('*')}
            >
              ×
            </CalculatorKey>
            <CalculatorKey
              className={styles.keySubtract}
              onPress={() => this.performOperation('-')}
            >
              −
            </CalculatorKey>
            <CalculatorKey
              className={styles.keyAdd}
              onPress={() => this.performOperation('+')}
            >
              +
            </CalculatorKey>
            <CalculatorKey
              className={styles.keyEquals}
              onPress={() => this.performOperation('=')}
            >
              =
            </CalculatorKey>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator
