import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import App from '../app'

test('can render to static markup', async () => {
  ReactDOMServer.renderToString(<App user={null} />)
})
