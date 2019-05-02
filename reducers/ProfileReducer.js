import {
  PROFILE_LOAD, PROFILE_FIELD_UPDATE, PROFILE_SAVE, 
  PROFILE_FETCH_SUCCESS, PROFILE_FETCH_FAIL, SPEAKER_LIKE, SPEAKER_DISLIKE
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
  mySchedule: ['plenary']
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
    case SPEAKER_LIKE:
      return {
        ...state,
        mySchedule: 
          state.mySchedule.includes(action.payload) 
            ? state.mySchedule 
            : state.mySchedule.concat( action.payload ) 
      }
    case SPEAKER_DISLIKE: 
      return {
        ...state, 
        mySchedule: state.mySchedule.filter(id => id !== action.payload)
      }
    default: 
      return state
  }
}