import firebase from 'firebase'
import {
  PROFILE_FIELD_UPDATE, PROFILE_SAVE, PROFILE_FETCH_SUCCESS
} from './types'

export const profileFieldUpdate = ({ prop, value }) => {
  return {
    type: PROFILE_FIELD_UPDATE,
    payload: { prop, value }
  }
}

export const profileSave = ({ token, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, navigation }) => {
  const { currentUser } = firebase.auth()

  return async (dispatch) => {
    await firebase.database().ref(`/users/${currentUser.uid}`)
      .set({ token, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule })

    dispatch({
      type: PROFILE_SAVE,
      payload: { token, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule }
    })
    
    navigation.navigate('Home')
  }
}

export const profileFetch = () => {
  const { currentUser } = firebase.auth()

  return async (dispatch) => {
    await firebase.database().ref(`/users/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({
          type: PROFILE_FETCH_SUCCESS,
          payload: snapshot.val()
        })
      })
  }
}