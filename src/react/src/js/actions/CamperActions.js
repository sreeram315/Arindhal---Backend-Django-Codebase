import { LOGIN, CHECK_AUTHENTICATION, USER_DETAILS, USER_UPDATE_PROFILE, USER_OPEN_DETAILS, USER_BASIC_DETAILS } from './types'
import cookie from 'react-cookies'

// export const fetchPosts = () => dispatch => {
//   fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => res.json())
//     .then(data =>
//       dispatch({
//      type: FETCH_POSTS,
//      payload: data
//       })
//     )
// }

export const loginAction = (loginData) => dispatch => {
  const endpoint = '/api-token-auth/'
  const csrfToken = cookie.load('csrftoken')
  let data = {
    'username': loginData.username,
    'password': loginData.password
  }
  let lookupOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: LOGIN,
      payload: res
    }))
    .catch(function (error) {
      console.log(error)
    })
}

export const checkAuthAction = () => dispatch => {
  let authToken = localStorage.getItem('authToken')
  if (authToken === undefined || authToken == null) { authToken = '0' }
  const endpoint = '/api-token-verify/'
  const csrfToken = cookie.load('csrftoken')
  let data = {
    'token': authToken
  }
  let lookupOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: CHECK_AUTHENTICATION,
      payload: res
    })).catch(function (error) {
      console.log(error)
    })
}

export const userBasicDetailsAction = () => dispatch => {
  console.log('requesting basic user data')
  let token = localStorage.getItem('authToken')
  if (token === undefined || token === null || !token.length > 0 || token === 'null') { console.log('rejected'); return }
  token = localStorage.getItem('authToken')
  const endpoint = '/api/accounts/user-basic-details/'
  let lookupOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    }
  }

  fetch(endpoint, lookupOptions)
    .then(function (response) {
      return response.json()
    }).then(res => dispatch({
      type: USER_BASIC_DETAILS,
      payload: res
    })).catch(function (error) {
      console.log(error)
    })
}

export const userDetailAction = () => dispatch => {
  console.log('requesting user details...')
  const endpoint = '/api/accounts/user-details/'
  const csrfToken = cookie.load('csrftoken')
  let token = localStorage.getItem('authToken')
  let lookupOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
      'X-CSRFToken': csrfToken
    },
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: USER_DETAILS,
      payload: res
    })).catch(function (error) {
      console.log(error)
    })
}

export const userOpenDetailAction = (slug) => dispatch => {
  console.log('requesting user details...')
  const endpoint = `/api/accounts/user-open-details/${slug}/`
  const csrfToken = cookie.load('csrftoken')
  let lookupOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    },
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: USER_OPEN_DETAILS,
      payload: res
    })).catch(function (error) {
      console.log(error)
    })
}

export const userUpdataAction = (data) => dispatch => {
  console.log('requesting profile update...')
  let endpoint = '/api/accounts/user-update/'
  let csrfToken = cookie.load('csrftoken')
  let token = localStorage.getItem('authToken')
  let lookupOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
      'Authorization': `JWT ${token}`

    },
    body: JSON.stringify(data),
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (response) {
      console.log(response)
      return response.json()
    }).then(res => dispatch({
      type: USER_UPDATE_PROFILE,
      payload: res
    })).catch(function (error) {
      console.log(error)
    })
}
