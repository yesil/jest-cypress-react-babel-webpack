import {css, InterpolationWithTheme} from '@emotion/core'

import * as React from 'react'

interface IPanelProps {
  header: string
  children?: React.ReactNode
  css?: InterpolationWithTheme<any>
}

const Panel = ({header, children, css: customCss}: IPanelProps) => {
  return (
    <div
      css={
        css`
          align-items: 'center';
          display: 'flex';
          flex-direction: 'column';
          justify-content: 'stretch';
          padding: '5px 10px 5px 10px';
        ` && customCss
      }
    >
      <h2>{header}</h2>
      <div>{children}</div>
    </div>
  )
}

export default Panel
