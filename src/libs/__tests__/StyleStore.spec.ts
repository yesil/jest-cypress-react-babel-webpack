import { MediaQuery } from '../StyleStore'

describe('MediaQuery', () => {
  it('should render minWidth', () => {
    const mediaQuery = new MediaQuery()
    mediaQuery.minWidth = '600px'
    const expected = `@media only screen and (min-width: ${
      mediaQuery.minWidth
    }) {`
    expect(mediaQuery.query).toEqual(expected)
  })
})
