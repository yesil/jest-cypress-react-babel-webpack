import Provider from '@react/react-spectrum/Provider'
import * as React from 'react'

import {css} from '@emotion/core'
import {observer} from 'mobx-react'
import ElementStatePanel from './components/ElementStatePanel'
import MediaQueryPanel from './components/MediaQueryPanel'
import SpacingPanel from './components/SpacingPanel'
import StylesPanel from './components/StylesPanel'
import SubElementsPanel from './components/SubElementsPanel'
import {StyleManager} from './libs/StyleStore'
import {SubnodeClickCallback, SubnodeHighlightCallback} from './libs/types'

export default observer(function App(props: {
  store: StyleManager
  subnodeHighlightCallback: SubnodeHighlightCallback
  subnodeClickCallback: SubnodeClickCallback
}) {
  const currentStyle = props.store.currentStyle
  if (currentStyle) {
    return (
      <div
        css={css`
          bottom: 0;
          display: 'flex';
          flex-direction: 'column';
          height: '100%';
          max-width: ' 500px';
          overflow-y: 'scroll';
          position: 'fixed';
          right: '0';
          top: '0';
          z-index: 1001;
        `}
      >
        <Provider theme="light">
          <SubElementsPanel
            selector={currentStyle.selector}
            subnodeHighlightCallback={props.subnodeHighlightCallback}
            subnodeClickCallback={props.subnodeClickCallback}
          />
          <StylesPanel styles={currentStyle.styles} />
          <SpacingPanel
            styleReference={currentStyle.styleReference.bind(currentStyle)}
          />
          <ElementStatePanel />
          <MediaQueryPanel mediaQuery={currentStyle.mediaQuery} />
        </Provider>
      </div>
    )
  } else {
    return <p>select an element</p>
  }
})
