import { Font } from 'expo'
import { 
  FONTS_LOADED, FONTS_LOADED_FAIL, IMAGES_LOADED
} from './types'

export const loadFonts = () => async dispatch => {
  let fonts = await Font.loadAsync({
    'nunito': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
    'nunito-bold': require('../assets/fonts/Nunito/Nunito-Bold.ttf'),
    'nunito-black': require('../assets/fonts/Nunito/Nunito-Black.ttf'),
    'futura': require('../assets/fonts/Futura/Futura-Condensed-Medium.otf'),
    'futura-bold': require('../assets/fonts/Futura/Futura-Condensed-Bold.otf')
  })
  if ( fonts ) {
    dispatch({ 
      type: FONTS_LOADED
    })
  } else {
    // Start up FB Login process
    dispatch({
      type: FONTS_LOADED_FAIL
    })
  }
}

