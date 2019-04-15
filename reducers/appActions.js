import { 
  FONTS_LOADED, IMAGES_LOADED
} from '../actions/types'

const INITIAL_STATE = {
  fontsLoaded: false,
  imagesLoaded: false,
  error: '',
  loading: false,
}

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case FONTS_LOADED:
      return { ...state, fontsLoaded: true }
    case IMAGES_LOADED: 
      return { ...state, imagesLoaded: true }
    default: 
      return state
  }
}