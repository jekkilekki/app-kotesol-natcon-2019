import {
  GET_ATTENDEES
} from '../actions/types'

const INITIAL_STATE = {
  data: {},
}

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case GET_ATTENDEES:
      return { ...state, data: action.payload }
    default: 
      return state 
  }
}