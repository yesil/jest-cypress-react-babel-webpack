import Checkbox from '@react/react-spectrum/Checkbox'
import * as React from 'react'
import Panel from './Panel'

const ElementStatePanel = () => {
  return (
    <Panel header="Element state">
      <Checkbox label=":active" />
      <Checkbox label=":focus" />
      <Checkbox label=":focus-within" />
      <Checkbox label=":hover" />
      <Checkbox label=":visited" />
    </Panel>
  )
}

export default ElementStatePanel
