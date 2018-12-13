import {observer} from 'mobx-react'
import * as React from 'react'
import Panel from './Panel'

function CSSPanel({css}: {css: string}) {
  return (
    <Panel
      css={{
        maxWidth: '450px',
        wordWrap: 'break-word',
      }}
      header="CSS"
    >
      {css}
    </Panel>
  )
}

export default observer(CSSPanel)
