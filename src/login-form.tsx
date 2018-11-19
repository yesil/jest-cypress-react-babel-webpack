import {navigate} from '@reach/router'
import axios from 'axios'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

interface User {}

class LoginForm extends Component<{
  endpoint: string
  onSuccess: (user: User) => void,
}> {
  public static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    endpoint: PropTypes.string.isRequired,
  }
  public state = {error: null}
  public handleSubmit = (e) => {
    e.preventDefault()
    const {
      username: {value: username},
      password: {value: password},
    } = e.target.elements
    axios({
      method: 'POST',
      url: `http://localhost:3000/${this.props.endpoint}`,
      data: {username, password},
    }).then(
      ({data: {user}}) => {
        window.localStorage.setItem('token', user.token)
        this.props.onSuccess(user)
        navigate('/')
      },
      (error) => this.setState({error}),
    )
  }
  public render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          fontSize: 20,
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <label htmlFor='username-input'>Username</label>
          <input
            css={{marginLeft: 10, fontSize: 20}}
            id='username-input'
            name='username'
          />
        </div>
        <div css={{marginTop: 20, marginBottom: 20}}>
          <label htmlFor='password-input'>Password</label>
          <input
            css={{marginLeft: 10, fontSize: 20}}
            id='password-input'
            name='password'
            type='password'
          />
        </div>

        <button
          type='submit'
          css={{
            "fontSize": 18,
            "alignSelf": 'flex-end',
            "backgroundColor": 'rgba(0,0,0,0.15)',
            "padding": 8,
            "borderRadius": 2,
            ':focus': {
              backgroundColor: 'rgba(0,0,0,0.3)',
            },
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
