import FieldLabel from '@react/react-spectrum/FieldLabel'
import TextField from '@react/react-spectrum/TextField'
import {observer} from 'mobx-react'
import * as React from 'react'
import {Style} from '../libs/Style'
import Panel from './Panel'

function StylesPanel({styles}: {styles: Style[]}) {
  const fields = styles.map((style: Style) => (
    <li key={style.name}>
      <FieldLabel label={style.name} position="left" style={{width: '100px'}}>
        <TextField
          placeholder={style.value}
          value={style.value}
          onChange={newValue => {
            style.value = newValue
          }}
        />
      </FieldLabel>
    </li>
  ))
  return (
    <Panel header="Styles">
      <ul>{fields}</ul>
    </Panel>
  )
}

export default observer(StylesPanel)
