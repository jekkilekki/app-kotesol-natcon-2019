import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import firebase from 'firebase'
import { 
  CHECK_AUTH_STATUS, USER_LOGGED_IN, USER_LOGGED_OUT,
  FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, FB_LOGIN_USER,
  INPUT_EMAIL, INPUT_PASSWORD, SET_AUTHED_USER, 
  FIREBASE_LOGIN_SUCCESS, FIREBASE_LOGIN_FAIL, 
  FIREBASE_LOGIN_USER, FIREBASE_LOGOUT_USER, LOGOUT_SUCCESS, PROFILE_SAVE
} from './types'
import { generateUID } from '../utils/helpers'
import { profileSave, getProfile } from './profileActions'

/**
 * After appReady() (appActions.js) indicates that Font/Icon assets are loaded,
 * check Firebase's User authentication status
 */
export const checkAuthStatus = () => {
  return async (dispatch) => {
    dispatch({ type: CHECK_AUTH_STATUS })

    await firebase.auth().onAuthStateChanged((user) => {
      if (user) { userLoggedIn(dispatch, user) }
      else { userLoggedOut(dispatch) }
    })
  }
}

const userLoggedIn = (dispatch, user) => {
  dispatch({
    type: USER_LOGGED_IN,
    payload: user
  })
}

const userLoggedOut = (dispatch) => {
  dispatch({
    type: USER_LOGGED_OUT
  })
}

/**
 * Facebook Login logic
 */
// Good example with some refactoring: https://medium.com/datadriveninvestor/facebook-login-with-react-native-expo-firebase-and-typescript-56df4ed6099a
export const fbLogin = () => async (dispatch) => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '2279054512415452', {
      permissions: ['public_profile']
    });
  
  if ( type === 'cancel' ) {
    return dispatch({ 
      type: FB_LOGIN_FAIL,
      payload: 'Facebook login canceled.'
    })
  }

  if ( type === 'success' && token ) {
    dispatch({
      type: FB_LOGIN_SUCCESS,
      payload: token
    })

    // Build Firebase credential with the Facebook access token
    const credential = firebase.auth.FacebookAuthProvider.credential(token)

    // Sign into Firebase with the Facebook credential
    let user = await firebase.auth().signInAndRetrieveDataWithCredential(credential)

    if ( user ) getProfile( user )
  }
}

// const setAuthedUser = async ( dispatch, user, navigation ) => {
//   // await AsyncStorage.setItem('knc_token', token)
//   await AsyncStorage.setItem('knc_user', user)

//   dispatch({
//     type: SET_AUTHED_USER,
//     payload: user
//   })
  
//   navigation.navigate('Home')
// }

export const inputEmail = (text) => {
  return {
    type: INPUT_EMAIL,
    payload: text
  }
}

export const inputPassword = (text) => {
  return {
    type: INPUT_PASSWORD,
    payload: text
  }
}

export const firebaseLoginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: FIREBASE_LOGIN_USER })

    try {
      let user = await firebase.auth().signInWithEmailAndPassword( email, password )
      firebaseLoginUserSuccess(dispatch, user)
    } catch(err) {
      console.log(err)
      try {
        let user = await firebase.auth().createUserWithEmailAndPassword( email, password )
        firebaseLoginUserSuccess(dispatch, user)
      } catch(err) {
        firebaseLoginUserFail(dispatch, err)
      }
    }
  }
}

const firebaseLoginUserFail = (dispatch, err) => {
  dispatch({ 
    type: FIREBASE_LOGIN_FAIL,
    payload: err
  })
}

const firebaseLoginUserSuccess = async (dispatch, user) => {
  dispatch({
    type: FIREBASE_LOGIN_SUCCESS,
    payload: user.user
  })

  // let token = generateUID()

  // setAuthedUser( dispatch, user.user, navigation )
}

export const firebaseLogoutUser = () => {
  return (dispatch) => {
    dispatch({ type: FIREBASE_LOGOUT_USER })
    firebase.auth().signOut()
    dispatch({ type: LOGOUT_SUCCESS })
  }
}