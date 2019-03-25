import { SET_AUTHED_USER } from '../actions/authActions'
import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL } from '../actions/fblogin'

export default ( state = null, action ) => {
  switch ( action.type ) {
    case SET_AUTHED_USER:
      return action.uid
    case FB_LOGIN_SUCCESS: 
      return { token: action.payload }
    case FB_LOGIN_FAIL: 
      return { token: null }
    default: 
      return state
  }
}