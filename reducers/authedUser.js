import { SET_AUTHED_USER } from '../actions/authedUser'

export default ( state = null, action ) => {
  switch ( action.type ) {
    case SET_AUTHED_USER:
      return action.uid
    default: 
      return state
  }
}