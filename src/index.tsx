import {Router} from '@reach/router'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'
import './global.css'
import LoadUser from './load-user'
import LoginForm, {IUser} from './login-form'

const moduleX: any = module
if (moduleX.hot) {
  moduleX.hot.accept()
}

class Component extends React.Component<{}, {user: IUser | null}> {
  public state = {user: null}
  public render() {
    if (!this.state.user) {
      LoadUser().then(
        r => this.setState({user: r.data}),
        () => window.localStorage.removeItem('token'),
      )
    }

    return (
      <Router>
        <App
          path="/"
          user={this.state.user}
          logout={() => {
            window.localStorage.removeItem('token')
            this.setState({user: null})
          }}
        />
        <LoginForm
          path="/register"
          endpoint="register"
          onSuccess={u => this.setState({user: u})}
        />
        <LoginForm
          path="/login"
          endpoint="login"
          onSuccess={u => this.setState({user: u})}
        />
      </Router>
    )
  }
}

ReactDOM.render(<Component />, document.getElementById('app'))
