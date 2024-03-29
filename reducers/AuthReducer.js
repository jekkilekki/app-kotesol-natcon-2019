import { 
  CHECK_AUTH_STATUS, USER_LOGGED_IN, USER_LOGGED_OUT,
  FB_LOGIN_SUCCESS, FB_LOGIN_FAIL,
  FIREBASE_LOGIN_SUCCESS, FIREBASE_LOGIN_FAIL, 
  FIREBASE_LOGIN_USER, FIREBASE_LOGOUT_USER,
  INPUT_EMAIL, INPUT_PASSWORD, SET_AUTHED_USER
} from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  token: ''
}

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case CHECK_AUTH_STATUS:
      return { ...state, error: '' }
    case USER_LOGGED_IN: 
      return { ...state, ...INITIAL_STATE, user: action.payload }
    case USER_LOGGED_OUT:
      return { ...state, ...INITIAL_STATE }
    case SET_AUTHED_USER:
      return { ...state, user: action.payload }
    case FB_LOGIN_SUCCESS: 
      return { ...state, token: action.payload, error: '', loading: true }
    case FB_LOGIN_FAIL: 
      return { ...state, error: action.payload, token: null }
    case INPUT_EMAIL: 
      return { ...state, email: action.payload }
    case INPUT_PASSWORD: 
      return { ...state, password: action.payload }
    case FIREBASE_LOGIN_USER: 
      return { ...state, loading: true, error: '' }
    case FIREBASE_LOGIN_SUCCESS: 
      return { ...state, ...INITIAL_STATE, user: action.payload }
    case FIREBASE_LOGIN_FAIL:
      const { message } = action.payload
      let error = message

      switch ( message ) {
        case 'The email address is already in use by another account.':
          error += ' Did you forget your password?'
          break
        case 'The email address is badly formatted.':
          error = 'Please enter a valid email address.'
          break 
        default:
          error = error 
      }

      return { ...state, error: error, password: '', loading: false }
    case FIREBASE_LOGOUT_USER:
      return { ...state, ...INITIAL_STATE }
    default: 
      return state
  }
}