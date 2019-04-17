import { 
  FONTS_LOADED, IMAGES_LOADED,
  ATTENDEES_FETCH_SUCCESS
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
    case ATTENDEES_FETCH_SUCCESS: 
      return { ...state, action }
    default: 
      return state
  }
}