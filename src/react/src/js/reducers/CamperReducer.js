import { LOGIN, CHECK_AUTHENTICATION, USER_DETAILS, USER_UPDATE_PROFILE, USER_OPEN_DETAILS } from '../actions/types'

const initialState = {
  data: [],
  isAuthenticated: null,
  token: false,
  loggedIn: false,
  toggler: 1,
  userDetails: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    // LOGIN //
    case LOGIN:
      if ('token' in action.payload) {
        localStorage.setItem('authToken', action.payload.token)
        return {
          ...state,
          token: true,
          loggedIn: true,
          toggler: Math.random()
        }
      } else {
        return {
          ...state,
          token: false,
          loggedIn: false,
          toggler: Math.random()
        }
      }

      // CHECK_AUTHENTICATION
    case CHECK_AUTHENTICATION:
      if ('token' in action.payload && action.payload.token[0] !== 'This field may not be blank.') {
        console.log('LOGGED USER')
        return {
          ...state,
          isAuthenticated: true
        }
      } else {
        console.log('NOT LOGGED USER')
        return {
          ...state,
          isAuthenticated: false
        }
      }

      // USER_DETAILS
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      }

      // . USER_UPDATE_PROFILE
    case USER_UPDATE_PROFILE:
      console.log('recusr of profile update')
      return {
        ...state,
        userDetails: action.payload
      }

    // USER_OPEN_DETAILS
    case USER_OPEN_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      }

    default:
      return state
  }
  return state
}
