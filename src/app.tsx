import {Link} from '@reach/router'
import {ThemeProvider} from 'emotion-theming'
import * as React from 'react'
import Calculator from './calculator'
import {IUser} from './login-form'
import themes from './themes'

class App extends React.Component<
  {
    path?: string
    user: IUser | null
    logout?: () => void
  },
  {theme: any}
> {
  public state = {theme: 'dark'}
  public handleThemeChange = ({
    target: {value},
  }: React.ChangeEvent<HTMLInputElement>) => this.setState({theme: value})
  public render() {
    return (
      <ThemeProvider theme={themes.light}>
        <React.Fragment>
          <Calculator />
          <div style={{marginTop: 30}}>
            <fieldset>
              <legend>Theme</legend>
              <label>
                <input
                  onChange={this.handleThemeChange}
                  checked={this.state.theme === 'light'}
                  type="radio"
                  name="theme"
                  value="light"
                />{' '}
                light
              </label>
              <label>
                <input
                  onChange={this.handleThemeChange}
                  checked={this.state.theme === 'dark'}
                  type="radio"
                  name="theme"
                  value="dark"
                />{' '}
                dark
              </label>
            </fieldset>
          </div>
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            {this.props.user ? (
              <>
                <div data-testid="username-display">
                  {this.props.user.username}
                </div>
                <button type="button" onClick={this.props.logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
          <div style={{marginTop: 30, textAlign: 'center'}}>
            Calculator component{' '}
            <a href="https://codepen.io/mjijackson/pen/xOzyGX">created</a>
            {' by '}
            <br />
            <a href="https://twitter.com/mjackson">Michael Jackson</a> of{' '}
            <a href="https://reacttraining.com/">React Training</a>
          </div>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

export default App
