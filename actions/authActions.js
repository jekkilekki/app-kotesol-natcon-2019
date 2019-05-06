import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import firebase from 'firebase'
import { 
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
  FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, FB_LOGIN_USER,
  INPUT_EMAIL, INPUT_PASSWORD, SET_AUTHED_USER, 
  FIREBASE_LOGIN_SUCCESS, FIREBASE_LOGIN_FAIL, 
  FIREBASE_LOGIN_USER, FIREBASE_LOGOUT_USER
} from './types'
import { generateUID } from '../utils/helpers'
import { profileSave } from './userActions'

/**
 * Facebook Login logic
 */
// Usage of AsyncStorage
// AsyncStorage.setItem('fb_token', token)
// AsyncStorage.getItem('fb_token')
// AsyncStorage.removeItem('fb_token')
export const fbLogin = (navigation) => async dispatch => {
  // let token = await AsyncStorage.getItem('knc_token')
  let user = await AsyncStorage.getItem('knc_user')
  if (token) {
    // Dispatch FB_LOGIN_SUCCESS action
    dispatch({ 
      type: FB_LOGIN_SUCCESS,
      payload: token
    })
  } else if ( user ) {
    dispatch({
      type: SET_AUTHED_USER,
      payload: user
    })
  } else {
    // Start up FB Login process
    doFBLogin(dispatch, navigation);
  }
}

// @TODO
// Good example with some refactoring: https://medium.com/datadriveninvestor/facebook-login-with-react-native-expo-firebase-and-typescript-56df4ed6099a
const doFBLogin = async (dispatch, navigation) => {
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
    
    setAuthedUser( dispatch, user.user, navigation )
  }
}

const setAuthedUser = async ( dispatch, user, navigation ) => {
  // await AsyncStorage.setItem('knc_token', token)
  await AsyncStorage.setItem('knc_user', user)

  dispatch({
    type: SET_AUTHED_USER,
    payload: user
  })
  
  navigation.navigate('Profile', { user: user })
}

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

export const loginUser = (user = null) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER })

    // if ( user !== null ) {
    //   loginUserSuccess(dispatch, user)
    // } else {
      await firebase.auth().onAuthStateChanged((checkUser) => {
        if (checkUser) { loginUserSuccess(dispatch, checkUser) }
        else loginUserFail(dispatch, 'No user in AsyncStorage found.')
      })
    // }
  }
}

const loginUserSuccess = (dispatch, user) => {
  // return async (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    })

    // profileSave({
    //   token: '', 
    //   img: '', 
    //   firstName: 'Aaron', 
    //   lastName: 'Snowberger', 
    //   affiliation: 'test', 
    //   shortBio: '', 
    //   email: '', 
    //   myFriends: '', 
    //   mySchedule: '', 
    //   navigation
    // })
  // }
}

const loginUserFail = (dispatch, err) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: err 
  })
}

export const firebaseLoginUser = ({ email, password, navigation }) => {
  return async (dispatch) => {
    dispatch({ type: FIREBASE_LOGIN_USER })

    try {
      let user = await firebase.auth().signInWithEmailAndPassword( email, password )
      firebaseLoginUserSuccess(dispatch, user, navigation)
    } catch(err) {
      console.log(err)
      try {
        let user = await firebase.auth().createUserWithEmailAndPassword( email, password )
        firebaseLoginUserSuccess(dispatch, user, navigation)
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

const firebaseLoginUserSuccess = async (dispatch, user, navigation) => {
  dispatch({
    type: FIREBASE_LOGIN_SUCCESS,
    payload: user.user
  })

  // let token = generateUID()

  setAuthedUser( dispatch, user.user, navigation )
}

export const firebaseLogoutUser = () => {
  return (dispatch) => {
    dispatch({ type: FIREBASE_LOGOUT_USER })
    firebase.auth().signOut()
  }
}