import { 
  ASSETS_LOADED, SPEAKERS_LIST_COLLAPSE, SPEAKERS_LIST_EXPAND,
  SCHEDULE_LIST_COLLAPSE, SCHEDULE_LIST_EXPAND,
  ATTENDEES_FETCH_SUCCESS, LOGIN_USER_SUCCESS, LOGOUT_SUCCESS, LOGIN_USER_FAIL
} from '../actions/types'

const INITIAL_STATE = {
  assetsLoaded: false,
  loggedIn: null,
  error: '',
  speakersExpanded: true,
  scheduleExpanded: false 
}

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case ASSETS_LOADED:
      return { ...state, assetsLoaded: true }
    case LOGIN_USER_SUCCESS:
      return { ...state, loggedIn: true }
    case LOGIN_USER_FAIL: 
      return { ...state, loggedIn: false }
    case LOGOUT_SUCCESS: 
      return { ...state, loggedIn: false }
    case SPEAKERS_LIST_COLLAPSE:
      return { ...state, speakersExpanded: false }
    case SPEAKERS_LIST_EXPAND:
      return { ...state, speakersExpanded: true }
    case SCHEDULE_LIST_COLLAPSE:
      return { ...state, scheduleExpanded: false }
    case SCHEDULE_LIST_EXPAND:
      return { ...state, scheduleExpanded: true }
    case ATTENDEES_FETCH_SUCCESS: 
      return { ...state, attendees: action.payload }
    default: 
      return state
  }
}