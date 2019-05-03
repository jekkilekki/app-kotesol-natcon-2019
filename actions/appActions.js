import { Font } from 'expo'
import { 
  ASSETS_LOADED, LOGIN_SUCCESS, LOGOUT_SUCCESS,
  SPEAKERS_LIST_COLLAPSE, SPEAKERS_LIST_EXPAND,
  SCHEDULE_LIST_COLLAPSE, SCHEDULE_LIST_EXPAND,
  SPEAKER_SEARCH, SPEAKER_FILTER, PROFILE_SAVE
} from './types'

export const loadAssets = () => async (dispatch) => {
  let user = await AsyncStorage.getItem('knc_user')
  if ( user ) {
    console.log('User!!!', user)
    dispatch({
      type: PROFILE_SAVE,
      payload: user
    })
  } else {
    console.log('no user...')
  }

  let token = await AsyncStorage.getItem('knc_token')
  if ( token ) {
    console.log('Token!!!', token)
  } else {
    console.log('no token...')
  }

  const assets = await Promise.all([
    Asset.loadAsync([

    ]),
    Font.loadAsync({
      ...Icon.AntDesign.font,
      ...Icon.Entypo.font,
      ...Icon.Foundation.font,
      ...Icon.FontAwesome.font,
      ...Icon.MaterialIcons.font,
      ...Icon.MaterialCommunityIcons.font,
      'nunito': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
      'nunito-bold': require('../assets/fonts/Nunito/Nunito-Bold.ttf'),
      'nunito-black': require('../assets/fonts/Nunito/Nunito-Black.ttf'),
      'futura': require('../assets/fonts/Futura/Futura-Condensed-Medium.otf'),
      'futura-bold': require('../assets/fonts/Futura/Futura-Condensed-Bold.otf')
    })
  ])

  if ( assets ) {
    dispatch({ 
      type: ASSETS_LOADED
    })
  } else {
    // Start up FB Login process
    dispatch({
      type: ASSETS_LOADED_FAIL
    })
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

export const appReady = () => {
  return {
    type: ASSETS_LOADED,
    // payload: text
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