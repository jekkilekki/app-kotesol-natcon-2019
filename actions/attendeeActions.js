import firebase from 'firebase'
import {
  GET_ATTENDEES
} from './types'

export const getAttendees = () => {
  return async (dispatch) => {
    await firebase.database().ref(`users`)
      .once('value')
      .then((snapshot) => {
        if ( snapshot.val() ) {
          dispatch({
            type: GET_ATTENDEES,
            payload: snapshot.val() 
          })
        }
      })
      .catch(err => {
        console.log( 'Attendees fetch error: ', err )
      })
  }
}