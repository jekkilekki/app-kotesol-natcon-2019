import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL } from './fblogin'
export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

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
  dispatch({
    type: FB_LOGIN_SUCCESS,
    payload: token
  })
}