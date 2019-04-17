import firebase from 'firebase'
import {
  PROFILE_FIELD_UPDATE, PROFILE_SAVE, PROFILE_FETCH_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
  img: '',
  firstName: '',
  lastName: '',
  affiliation: '',
  shortBio: '',
  email: '',
  myFriends: [],
  mySchedule: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_FIELD_UPDATE: 
      // action.payload === { prop: 'name', value: 'aaron' }
      return { ...state, [action.payload.prop]: action.payload.value } // key interpolation
    case PROFILE_SAVE: 
      // return INITIAL_STATE if you want to empty all the input fields
      return state
    case PROFILE_FETCH_SUCCESS: 
      return state
    default: 
      return state
  }
}