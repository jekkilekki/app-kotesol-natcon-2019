import { 
  FB_LOGIN_SUCCESS, FB_LOGIN_FAIL,
  FIREBASE_LOGIN_SUCCESS, FIREBASE_LOGIN_FAIL, FIREBASE_LOGIN_USER,
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
    case SET_AUTHED_USER:
      return action.uid
    case FB_LOGIN_SUCCESS: 
      return { token: action.payload }
    case FB_LOGIN_FAIL: 
      return { token: null }
    case INPUT_EMAIL: 
      return { ...state, email: action.payload }
    case INPUT_PASSWORD: 
      return { ...state, password: action.payload }
    case FIREBASE_LOGIN_USER: 
      return { ...state, loading: true, error: '' }
    case FIREBASE_LOGIN_SUCCESS: 
      return { ...state, ...INITIAL_STATE, user: action.payload }
    case FIREBASE_LOGIN_FAIL:
      return { ...state, error: 'Authentication failed. Please try again.', password: '', loading: false }
    default: 
      return state
  }
}