// import firebase from 'firebase'
import { AsyncStorage } from 'react-native'
import {
  PROFILE_FIELD_UPDATE, PROFILE_SAVE, 
  SPEAKER_LIKE, SPEAKER_DISLIKE,
  FRIEND_LIKE, FRIEND_DISLIKE,
  PLACE_LIKE, PLACE_DISLIKE, PROFILE_TEMP, PROFILE_RESET
} from './types'
import { generateUID } from '../utils/helpers';

export const profileFieldUpdate = ({ prop, value }) => {
  return {
    type: PROFILE_FIELD_UPDATE,
    payload: { prop, value }
  }
}

/** Get Profile for AsyncStorage */
export const getProfile = () => {
  
  return async (dispatch) => {
    let currentUser = await AsyncStorage.getItem('knc-profile')
    currentUser = JSON.parse(currentUser)

    dispatch({
      type: PROFILE_SAVE,
      payload: { 
        uid: currentUser.uid || generateUID(),
        img: currentUser.img || 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png', 
        firstName: currentUser.displayName || '2019 KOTESOL', 
        lastName: currentUser.lastName || 'National Conference', 
        affiliation: currentUser.affiliation || 'Motiva(c)tion: Sparking Learner Motivation in our Evolving Context', 
        shortBio: currentUser.shortBio || "The English language teaching context is in constant flux, with our students' focus on technology seemingly reducing their attention span, the rapid change in student number with the low birth rate in Korea, and other factors within and beyond our control. How can we as teachers, administrators, parents, and members of the public take action to improve learner motivation to learn English?", 
        email: currentUser.email || '', 
        myFriends: currentUser.myFriends || [], 
        mySchedule: currentUser.mySchedule || ['plenary'],
        myPlaces: currentUser.myPlaces || ['conference'],
        displayInfo: currentUser.displayInfo || '',
        secretKey: currentUser.secretKey || ''
      }
    })
  }
}

/** Get Profile for Firebase user */
// export const getProfile = () => {
//   const { currentUser } = firebase.auth()

//   return async (dispatch) => {
//     await firebase.database().ref(`users/${currentUser.uid}`)
//       .once('value').then((snapshot) => {
//         if ( snapshot.val() ) {
//           const img = snapshot.val().img 
//             ? snapshot.val().img.replace('?height=300','') 
//             : currentUser.photoUrl 
//               ? currentUser.photoUrl
//               : 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png'
//           dispatch({
//             type: PROFILE_SAVE,
//             payload: { 
//               uid: currentUser.uid,
//               img: img + '?height=300' || currentUser.photoURL || '', 
//               firstName: snapshot.val().firstName || currentUser.displayName || '', 
//               lastName: snapshot.val().lastName || '', 
//               affiliation: snapshot.val().affiliation || '', 
//               shortBio: snapshot.val().shortBio || '', 
//               email: snapshot.val().email || currentUser.email || '', 
//               myFriends: snapshot.val().myFriends || [], 
//               mySchedule: snapshot.val().mySchedule || ['plenary'],
//               myPlaces: snapshot.val().myPlaces || ['conference'],
//               displayInfo: snapshot.val().displayInfo || '',
//               secretKey: snapshot.val().secretKey || ''
//             }
//           })
//         }
//       })
//   }
// }

export const profileSave = ({ uid, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, myPlaces, displayInfo, secretKey }) => {
  // const { currentUser } = firebase.auth()

  return async (dispatch, getState) => {
  //   await firebase.database().ref(`/users/${currentUser.uid}`)
  //     .set({ 
  //       uid: currentUser.uid, 
  //       img, 
  //       firstName, 
  //       lastName, 
  //       affiliation, 
  //       shortBio, 
  //       email, 
  //       myFriends, 
  //       mySchedule, 
  //       myPlaces, 
  //       displayInfo, 
  //       secretKey 
  //     })

    await AsyncStorage.setItem('knc-profile', JSON.stringify({ 
      uid, img, firstName, lastName, affiliation, shortBio, email, 
      myFriends, mySchedule, myPlaces, displayInfo, secretKey 
    }))
    
    dispatch({
      type: PROFILE_SAVE,
      payload: {
        // uid: currentUser.uid, 
        uid,
        img, 
        firstName, 
        lastName, 
        affiliation, 
        shortBio, 
        email, 
        myFriends, 
        mySchedule, 
        myPlaces, 
        displayInfo, 
        secretKey 
      }
    })
  }
}

export const profileTemp = () => {
  return (dispatch, getState) => {
    dispatch({
      type: PROFILE_TEMP,
      payload: getState().profile
    })
  }
}

export const profileReset = () => {
  return (dispatch, getState) => {
    dispatch({
      type: PROFILE_RESET,
      payload: getState().app.profileTemp
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


/**
 * Like / dislike Speakers
 */
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

/**
 * Like / dislike Attendees (Friends)
 */
export const likeFriend = (uid) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: FRIEND_LIKE,
      payload: uid
    })
    await dispatch( profileSave( getState().profile ) )
  }
}

export const dislikeFriend = (uid) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: FRIEND_DISLIKE,
      payload: uid
    })
    await dispatch( profileSave( getState().profile ) )
  }
}

/**
 * Like / dislike Places
 */
export const likePlace = (id) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: PLACE_LIKE,
      payload: id
    })
    await dispatch( profileSave( getState().profile ) )
  }
}

export const dislikePlace = (id) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: PLACE_DISLIKE,
      payload: id
    })
    await dispatch( profileSave( getState().profile ) )
  }
}