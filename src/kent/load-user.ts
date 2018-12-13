import axios from 'axios'

function LoadUser() {
  const token = window.localStorage.getItem('token')
  return token
    ? axios({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        url: 'http://localhost:3000/me',
      })
    : Promise.reject('No token')
}

export default LoadUser
