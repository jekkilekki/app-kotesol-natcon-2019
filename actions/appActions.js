import { Font } from 'expo'
import { 
  ASSETS_LOADED,
  SPEAKER_SEARCH, SPEAKER_FILTER
} from './types'

export const loadAssets = () => async (dispatch) => {
  const assets = await Promise.all([
    Asset.loadAsync([

    ]),
    Font.loadAsync({
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