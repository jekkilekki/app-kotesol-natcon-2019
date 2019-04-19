import { 
  ASSETS_LOADED,
  ATTENDEES_FETCH_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
  assetsLoaded: false,
  error: '',
  loading: false,
}

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case ASSETS_LOADED:
      return { ...state, assetsLoaded: true }
    case ATTENDEES_FETCH_SUCCESS: 
      return { ...state, attendees: action.payload }
    default: 
      return state
  }
}