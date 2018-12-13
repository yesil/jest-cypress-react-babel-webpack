import * as React from 'react'

interface CheckboxProps {
  label: string
  defaultChecked?: boolean
  onChange?: (newValue: boolean) => void
}
export default class Checkbox extends React.Component<CheckboxProps, any> {}
