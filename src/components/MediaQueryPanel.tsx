import * as React from 'react'

import Checkbox from '@react/react-spectrum/Checkbox'
import FieldLabel from '@react/react-spectrum/FieldLabel'
import TextField from '@react/react-spectrum/TextField'
import {observer} from 'mobx-react'
import {MediaQuery} from '../libs/StyleStore'
import Panel from './Panel'

function MediaQueryPanel({mediaQuery}: {mediaQuery: MediaQuery}) {
  return (
    <Panel header="Media Query">
      <Checkbox label="Tablet" />
      <Checkbox label="Desktop" />
      <span />
      <FieldLabel label="Min Width" position="left">
        <TextField
          value={mediaQuery.minWidth}
          onChange={newValue => (mediaQuery.minWidth = newValue)}
        />
      </FieldLabel>
      <FieldLabel label="Max Width" position="left">
        <TextField
          value={mediaQuery.maxWidth}
          onChange={newValue => (mediaQuery.maxWidth = newValue)}
        />
      </FieldLabel>
    </Panel>
  )
}

export default observer(MediaQueryPanel)
