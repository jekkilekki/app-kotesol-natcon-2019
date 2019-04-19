import {
  PROFILE_LOAD, PROFILE_FIELD_UPDATE, PROFILE_SAVE, 
  PROFILE_FETCH_SUCCESS, PROFILE_FETCH_FAIL
} from '../actions/types'

const INITIAL_STATE = {
  token: '',
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
    case PROFILE_LOAD:
      return state
    case PROFILE_FIELD_UPDATE: 
      // action.payload === { prop: 'name', value: 'aaron' }
      return { ...state, [action.payload.prop]: action.payload.value } // key interpolation
    case PROFILE_SAVE: 
      // return INITIAL_STATE if you want to empty all the input fields
      // could probably just load 'profile' as an Object and not have to deal with all these keys
      return { 
        ...state, 
          token: action.payload.token,
          img: action.payload.img,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          affiliation: action.payload.affiliation,
          email: action.payload.email,
          shortBio: action.payload.shortBio,
          myFriends: action.payload.myFriends,
          mySchedule: action.payload.mySchedule
        }
    case PROFILE_FETCH_SUCCESS: 
      return state
    case PROFILE_FETCH_FAIL:
      return state
    default: 
      return state
  }
}