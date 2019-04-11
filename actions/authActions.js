import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import firebase from 'firebase'
import { 
  FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, FB_LOGIN_USER,
  INPUT_EMAIL, INPUT_PASSWORD, SET_AUTHED_USER, 
  FIREBASE_LOGIN_SUCCESS, FIREBASE_LOGIN_FAIL, FIREBASE_LOGIN_USER,
} from './types'

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

/**
 * Facebook Login logic
 */
// Usage of AsyncStorage
// AsyncStorage.setItem('fb_token', token)
// AsyncStorage.getItem('fb_token')
export const fbLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token')
  if (token) {
    // Dispatch FB_LOGIN_SUCCESS action
    dispatch({ 
      type: FB_LOGIN_SUCCESS,
      payload: token
    })
  } else {
    // Start up FB Login process
    doFBLogin(dispatch);
  }
}

const doFBLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '2279054512415452', {
      permissions: ['public_profile']
    });
  
  if ( type === 'cancel' ) {
    return dispatch({ type: FB_LOGIN_FAIL })
  }

  await AsyncStorage.setItem('fb_token', token)
  const response = await fetch(`https://graph.facebok.com/me?access_token=${token}`)
  alert('Logged in!', `Hi ${(await response.json()).name}!`)
  dispatch({
    type: FB_LOGIN_SUCCESS,
    payload: token
  })
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
      firebaseLoginUserSuccess(dispatch, user)
      navigation.navigate('Home')
    } catch(err) {
      console.log(err)
      try {
        let user = await firebase.auth().createUserWithEmailAndPassword( email, password )
        firebaseLoginUserSuccess(dispatch, user)
        navigation.navigate('Home')
      } catch(err) {
        firebaseLoginUserFail(dispatch)
      }
    }
  }
}

const firebaseLoginUserFail = (dispatch) => {
  dispatch({ type: FIREBASE_LOGIN_FAIL })
}

const firebaseLoginUserSuccess = (dispatch, user) => {
  dispatch({
    type: FIREBASE_LOGIN_SUCCESS,
    payload: user
  })
}