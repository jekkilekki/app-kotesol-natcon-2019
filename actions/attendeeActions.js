import firebase from 'firebase'
import {
  GET_ATTENDEES
} from './types'

export const getAttendees = () => {
  return async (dispatch) => {
    await firebase.database().ref(`users`)
      .once('value')
      .then((snapshot) => {
        dispatch({
          type: GET_ATTENDEES,
          payload: snapshot.val() && snapshot.val() || 'No attendees found.', 
        })
      })
      .catch(err => {
        console.log( 'Attendees fetch error: ', err )
      })
  }
}