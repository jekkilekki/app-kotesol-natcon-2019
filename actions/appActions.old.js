import { 
  ASSETS_LOADED, LOGIN_USER, LOGIN_SUCCESS, LOGOUT_SUCCESS,
  SPEAKERS_LIST_COLLAPSE, SPEAKERS_LIST_EXPAND,
  SCHEDULE_LIST_COLLAPSE, SCHEDULE_LIST_EXPAND,
  SPEAKER_SEARCH, SPEAKER_FILTER, PROFILE_SAVE
} from './types'
import { checkAuthStatus } from './authActions'
import { getAttendees } from './attendeeActions'
import { getProfile } from './profileActions'

// export const loadUser = () => async (dispatch) => {
//   // Very first Redux function that runs
//   // 1. Load Fonts and Icons
//   // 2. Load User from AsyncStorage (or Firebase) if one exists
//   // 3. Dispatch actions to indicate new app state

//   let user = await AsyncStorage.getItem('knc_user')
//   if ( user ) {
//     console.log('User!!!', user)
//     dispatch({
//       type: PROFILE_SAVE,
//       payload: user
//     })
//   } else {
//     console.log('no user...')
//   }

//   let token = await AsyncStorage.getItem('knc_token')
//   if ( token ) {
//     console.log('Token!!!', token)
//   } else {
//     console.log('no token...')
//   }
// }

/**
 * Called from Main.js after Font & Icon assets are pre-loaded
 * Next step is checking User Firebase authentication (authActions.js)
 */
export const appReady = () => {
  return async (dispatch, getState) => {
    await dispatch({ type: ASSETS_LOADED })
    // await dispatch( getAttendees() )
    await dispatch( checkAuthStatus() )
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