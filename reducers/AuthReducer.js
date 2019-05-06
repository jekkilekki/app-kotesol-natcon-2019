import { 
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
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
    case LOGIN_USER:
      return { ...state, error: '' }
    case LOGIN_USER_SUCCESS: 
      return { ...state, ...INITIAL_STATE, user: action.payload }
    case LOGIN_USER_FAIL:
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