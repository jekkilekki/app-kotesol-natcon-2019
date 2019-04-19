import firebase from 'firebase'
import {
  PROFILE_FIELD_UPDATE, PROFILE_SAVE, 
  PROFILE_FETCH_SUCCESS, PROFILE_FETCH_FAIL
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

export const profileGetWithToken = (token) => {
  
  return async (dispatch) => {
    console.log('getting profile')
    // await firebase.database().ref(`/users/`)
    //   .on('value', snapshot => {
    //     snapshot.forEach(child => {
    //       console.log( 'child value: ', child.val() )
    //       if ( child.val().token === token ) {
    //         profileFetch( child.key )
    //         dispatch({
    //           type: PROFILE_FETCH_SUCCESS,
    //           payload: child.val()
    //         })
    //       } else {
    //         dispatch({
    //           type: PROFILE_FETCH_FAIL,
    //           payload: 'Some error in userActions.js'
    //         })
    //       }
    //     })
    //   })

    await firebase.database().ref('/users').orderByChild('token').equalTo(token).on('child_added', snapshot => {
      dispatch({
        type: PROFILE_FETCH_SUCCESS,
        payload: snapshot.val()
      })
    })
  }
}

export const profileFetch = ( uid = '' ) => {
  const { currentUser } = firebase.auth()
  const theUserId = currentUser.uid

  if ( uid !== '' ) { theUserId = uid }

  return async (dispatch) => {
    await firebase.database().ref(`/users/${theUserId}`)
      .on('value', snapshot => {
        dispatch({
          type: PROFILE_FETCH_SUCCESS,
          payload: snapshot.val()
        })
      })
  }
}