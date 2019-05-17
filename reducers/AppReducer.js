import { 
  ASSETS_LOADED, USER_LOGGED_IN, USER_LOGGED_OUT, 
  SPEAKERS_LIST_COLLAPSE, SPEAKERS_LIST_EXPAND,
  SCHEDULE_LIST_COLLAPSE, SCHEDULE_LIST_EXPAND,
  ATTENDEES_FETCH_SUCCESS, LOGOUT_SUCCESS, PROFILE_SAVE,
  PROFILE_TEMP
} from '../actions/types'

const INITIAL_STATE = {
  assetsLoaded: false,
  loggedIn: null,
  profileLoaded: false,
  profileTemp: {},
  error: '',
  speakersExpanded: true,
  scheduleExpanded: false 
}

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case ASSETS_LOADED:
      return { ...state, assetsLoaded: true }
    case USER_LOGGED_IN:
      return { ...state, loggedIn: true }
    case USER_LOGGED_OUT: 
      return { ...state, loggedIn: false, profileLoaded: false }
    case LOGOUT_SUCCESS: 
      return { ...state, loggedIn: false, profileLoaded: false }
    case PROFILE_SAVE: 
      return { ...state, profileLoaded: true }
    case PROFILE_TEMP: 
      return { ...state, profileTemp: action.payload }
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