import {
  PROFILE_LOAD, PROFILE_FIELD_UPDATE, PROFILE_SAVE, 
  PROFILE_FETCH_SUCCESS, PROFILE_FETCH_FAIL, 
  SPEAKER_LIKE, SPEAKER_DISLIKE,
  FRIEND_LIKE, FRIEND_DISLIKE,
  PLACE_LIKE, PLACE_DISLIKE,
  FIREBASE_LOGOUT_USER, PROFILE_RESET
} from '../actions/types'

const INITIAL_STATE = {
  uid: '',
  img: '',
  firstName: '',
  lastName: '',
  affiliation: '',
  shortBio: '',
  email: '',
  myFriends: [],
  mySchedule: [],
  myPlaces: [],
  displayInfo: true,
  secretKey: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_LOAD:
      return state
    case PROFILE_FIELD_UPDATE: 
      // action.payload === { prop: 'name', value: 'aaron' }
      return { ...state, [action.payload.prop]: action.payload.value || '' } // key interpolation
    case PROFILE_RESET:
      return {
        ...state, 
          uid: action.payload.uid,
          img: action.payload.img,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          affiliation: action.payload.affiliation,
          email: action.payload.email,
          shortBio: action.payload.shortBio,
          myFriends: action.payload.myFriends,
          mySchedule: action.payload.mySchedule,
          myPlaces: action.payload.myPlaces,
          displayInfo: action.payload.displayInfo,
          secretKey: action.payload.secretKey
        }
    case PROFILE_SAVE: 
      // return INITIAL_STATE if you want to empty all the input fields
      // could probably just load 'profile' as an Object and not have to deal with all these keys
      return { 
        ...state, 
          uid: action.payload.uid,
          img: action.payload.img,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          affiliation: action.payload.affiliation,
          email: action.payload.email,
          shortBio: action.payload.shortBio,
          myFriends: action.payload.myFriends,
          mySchedule: action.payload.mySchedule,
          myPlaces: action.payload.myPlaces,
          displayInfo: action.payload.displayInfo,
          secretKey: action.payload.secretKey
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
    case FRIEND_LIKE:
      return {
        ...state,
        myFriends: 
          state.myFriends.includes(action.payload) 
            ? state.myFriends 
            : state.myFriends.concat( action.payload ) 
      }
    case FRIEND_DISLIKE: 
      return {
        ...state, 
        myFriends: state.myFriends.filter(id => id !== action.payload)
      }
    case PLACE_LIKE:
      return {
        ...state,
        myPlaces: 
          state.myPlaces.includes(action.payload) 
            ? state.myPlaces 
            : state.myPlaces.concat( action.payload ) 
      }
    case PLACE_DISLIKE: 
      return {
        ...state, 
        myPlaces: state.myPlaces.filter(id => id !== action.payload)
      }
    case FIREBASE_LOGOUT_USER: 
      return { ...state, ...INITIAL_STATE }
    default: 
      return state
  }
}