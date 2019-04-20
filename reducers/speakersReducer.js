import data from '../utils/SpeakersList.json'
import {
  SPEAKER_SEARCH, SPEAKER_FILTER
} from '../actions/types'

// export default () => data

const INITIAL_STATE = {
  data
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SPEAKER_SEARCH:
      return { ...state, search: action.payload }
    case SPEAKER_FILTER: 
      return { ...state, filter: action.payload }
    default: 
      return state
  }
}