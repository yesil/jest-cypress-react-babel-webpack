import {navigate} from '@reach/router'
import axios from 'axios'
import * as React from 'react'

export interface IUser {
  username: string
  token: string
}

class LoginForm extends React.Component<{
  endpoint: string
  path: string
  onSuccess: (user: IUser) => void
}> {
  public state = {error: null}
  public handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const elements = (e.target as HTMLFormElement).elements
    const password = (elements.namedItem('password') as HTMLInputElement).value
    const username = (elements.namedItem('username') as HTMLInputElement).value

    axios({
      data: {username, password},
      method: 'POST',
      url: `http://localhost:3000/${this.props.endpoint}`,
    }).then(
      ({data: {user}}) => {
        window.localStorage.setItem('token', user.token)
        this.props.onSuccess(user)
        navigate('/')
      },
      error => this.setState({error}),
    )
  }
  public render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 20,
          justifyContent: 'center',
          width: 300,
        }}
      >
        <div>
          <label htmlFor="username-input">Username</label>
          <input
            css={{marginLeft: 10, fontSize: 20}}
            id="username-input"
            name="username"
          />
        </div>
        <div css={{marginTop: 20, marginBottom: 20}}>
          <label htmlFor="password-input">Password</label>
          <input
            css={{marginLeft: 10, fontSize: 20}}
            id="password-input"
            name="password"
            type="password"
          />
        </div>

        <button
          type="submit"
          css={{
            ':focus': {
              backgroundColor: 'rgba(0,0,0,0.3)',
            },
            alignSelf: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.15)',
            borderRadius: 2,
            fontSize: 18,
            padding: 8,
          }}
        >
          Submit
        </button>
        {this.state.error ? (
          <div>There was an error. Please try again.</div>
        ) : null}
      </form>
    )
  }
}

export default LoginForm
