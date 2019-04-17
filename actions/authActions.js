import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import firebase from 'firebase'
import { 
  FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, FB_LOGIN_USER,
  INPUT_EMAIL, INPUT_PASSWORD, SET_AUTHED_USER, 
  FIREBASE_LOGIN_SUCCESS, FIREBASE_LOGIN_FAIL, 
  FIREBASE_LOGIN_USER, FIREBASE_LOGOUT_USER
} from './types'
import { profileSave } from './userActions'
import { generateUID } from '../utils/helpers';

/**
 * Facebook Login logic
 */
// Usage of AsyncStorage
// AsyncStorage.setItem('fb_token', token)
// AsyncStorage.getItem('fb_token')
export const fbLogin = (navigation) => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token')
  if (token) {
    // Dispatch FB_LOGIN_SUCCESS action
    dispatch({ 
      type: FB_LOGIN_SUCCESS,
      payload: token
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
    return dispatch({ type: FB_LOGIN_FAIL })
  }

  if ( type === 'success' && token ) {
    await AsyncStorage.setItem('fb_token', token)
    dispatch({
      type: FB_LOGIN_SUCCESS,
      payload: token
    })

    // Build Firebase credential with the Facebook access token
    const credential = firebase.auth.FacebookAuthProvider.credential(token)

    // Sign into Firebase with the Facebook credential
    let user = await firebase.auth().signInAndRetrieveDataWithCredential(credential)
    // const { photoURL, displayName, email } = user
    // let aff = ''
    // let bio = ''
    // let friends = []
    // let sch = []
    
    // profileSave({ photoURL, displayName, displayName, aff, bio, email, friends, sch, navigation })
    setAuthedUser( dispatch, user.user, token, navigation )
  }
  
  // let user = await fetch(`https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture{url}&access_token=${token}`)
  // setAuthedUser( dispatch, await user.json(), token, navigation );
}

const setAuthedUser = async ( dispatch, user, token, navigation ) => {
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

  let token = generateUID()

  setAuthedUser( dispatch, user.user, token, navigation )
}

export const firebaseLogoutUser = () => {
  return (dispatch) => {
    dispatch({ type: FIREBASE_LOGOUT_USER })
    firebase.auth().signOut()
  }
}