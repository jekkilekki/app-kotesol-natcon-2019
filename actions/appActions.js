import { 
  ASSETS_LOADED, LOGIN_USER, LOGIN_SUCCESS, LOGOUT_SUCCESS,
  SPEAKERS_LIST_COLLAPSE, SPEAKERS_LIST_EXPAND,
  SCHEDULE_LIST_COLLAPSE, SCHEDULE_LIST_EXPAND,
  SPEAKER_SEARCH, SPEAKER_FILTER, PROFILE_SAVE
} from './types'
import { checkAuthStatus } from './authActions'
import { getAttendees } from './attendeeActions'
import { getProfile } from './profileActions'

/**
 * Called from Main.js after Font & Icon assets are pre-loaded
 * Next step is checking User Firebase authentication (authActions.js)
 */
export const appReady = () => {
  return async (dispatch, getState) => {
    // Load assets (fonts and images first)
    await dispatch({ type: ASSETS_LOADED })

    // Check AsyncStorage for a key - indicates user has used the app before
    // UserID is created on the first run of the app - can be used to display WelcomeScreen only on first run if desired
    await dispatch( checkAuthStatus() )

    // User SHOULD be "loggedIn" automatically after first run, so load the profile stored (set) in AsyncStorage
    if ( getState().app.loggedIn ) await dispatch( getProfile() )
  }
}

export const speakerSearch = (query) => {
  return {
    type: SPEAKER_SEARCH,
    payload: query
  }
}

export const speakerFilter = (query) => {
  return {
    type: SPEAKER_FILTER,
    payload: query
  }
}

export const expandSpeakersList = () => {
  return {
    type: SPEAKERS_LIST_EXPAND
  }
}

export const collapseSpeakersList = () => {
  return {
    type: SPEAKERS_LIST_COLLAPSE
  }
}

export const expandScheduleList = () => {
  return {
    type: SCHEDULE_LIST_EXPAND
  }
}

export const collapseScheduleList = () => {
  return {
    type: SCHEDULE_LIST_COLLAPSE
  }
}