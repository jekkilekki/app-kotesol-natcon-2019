import firebase from 'firebase'
import {
  PROFILE_FIELD_UPDATE, PROFILE_SAVE, 
  SPEAKER_LIKE, SPEAKER_DISLIKE
} from './types'

export const profileFieldUpdate = ({ prop, value }) => {
  return {
    type: PROFILE_FIELD_UPDATE,
    payload: { prop, value }
  }
}

export const getProfile = () => {
  const { currentUser } = firebase.auth()

  return async (dispatch) => {
    await firebase.database().ref(`users/${currentUser.uid}`)
      .once('value').then((snapshot) => {
        if ( snapshot.val() ) {
          dispatch({
            type: PROFILE_SAVE,
            payload: { 
              img: snapshot.val().img || currentUser.photoURL || '', 
              firstName: snapshot.val().firstName || currentUser.displayName || '', 
              lastName: snapshot.val().lastName || '', 
              affiliation: snapshot.val().affiliation || '', 
              shortBio: snapshot.val().shortBio || '', 
              email: snapshot.val().email || currentUser.email || '', 
              myFriends: snapshot.val().myFriends || [], 
              mySchedule: snapshot.val().mySchedule || ['plenary'] 
            }
          })
        }
      })
  }
}

export const profileSave = ({ img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule }) => {
  const { currentUser } = firebase.auth()

  return async (dispatch) => {
    await firebase.database().ref(`/users/${currentUser.uid}`)
      .set({ img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule })

    // await AsyncStorage.setItem('knc_user', { img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule })
    
    dispatch({
      type: PROFILE_SAVE,
      payload: { img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule }
    })
  }
}

// export const profileGetWithToken = (token) => {
  
//   return async (dispatch) => {
//     console.log('getting profile')
//     // await firebase.database().ref(`/users/`)
//     //   .on('value', snapshot => {
//     //     snapshot.forEach(child => {
//     //       console.log( 'child value: ', child.val() )
//     //       if ( child.val().token === token ) {
//     //         profileFetch( child.key )
//     //         dispatch({
//     //           type: PROFILE_FETCH_SUCCESS,
//     //           payload: child.val()
//     //         })
//     //       } else {
//     //         dispatch({
//     //           type: PROFILE_FETCH_FAIL,
//     //           payload: 'Some error in userActions.js'
//     //         })
//     //       }
//     //     })
//     //   })

//     await firebase.database().ref('/users').orderByChild('token').equalTo(token).on('child_added', snapshot => {
//       dispatch({
//         type: PROFILE_FETCH_SUCCESS,
//         payload: snapshot.val()
//       })
//     })
//   }
// }

// export const profileFetch = ( uid = '' ) => {
//   const { currentUser } = firebase.auth()
//   const theUserId = currentUser.uid

//   if ( uid !== '' ) { theUserId = uid }

//   return async (dispatch) => {
//     await firebase.database().ref(`/users/${theUserId}`)
//       .on('value', snapshot => {
//         dispatch({
//           type: PROFILE_FETCH_SUCCESS,
//           payload: snapshot.val()
//         })
//       })
//   }
// }

// export const updateProfile = () => {

// }

export const likeSpeaker = (id) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: SPEAKER_LIKE,
      payload: id
    })
    await dispatch( profileSave( getState().profile ) )
  }
}

export const dislikeSpeaker = (id) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: SPEAKER_DISLIKE,
      payload: id
    })
    await dispatch( profileSave( getState().profile ) )
  }
}