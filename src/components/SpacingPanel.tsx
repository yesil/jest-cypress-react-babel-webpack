import * as React from 'react'

import Panel from './Panel'
import Rectangle from './Rectangle'

function SpacingPanel(props: any) {
  return (
    <Panel header="Spacing">
      <Rectangle label="margin" border="dashed" color="#f8c696" {...props}>
        <Rectangle label="border" color="#fdd791" {...props}>
          <Rectangle label="padding" border="dotted" color="#bdc880" {...props}>
            <Rectangle border="solid" color="#83acba">
              <p className="text">&nbsp;</p>
            </Rectangle>
          </Rectangle>
        </Rectangle>
      </Rectangle>
    </Panel>
  )
}

export default SpacingPanel
