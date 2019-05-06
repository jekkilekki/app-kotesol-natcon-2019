import { getInitialData } from '../utils/api'
import { setAuthedUser } from './authActions'
// import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = null

export const handleInitialData = () => {
  return (dispatch) => {
    return getInitialData()
      .then(() => {
        dispatch( setAuthedUser( AUTHED_ID ))
      })
  }
}