import { getInitialData } from '../utils/api'
import { setAuthedUser } from '../actions/authedUser'
// import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = null

export function handleInitialData() {
  return dispatch => {
    return getInitialData()
      .then(() => {
        dispatch( setAuthedUser( AUTHED_ID ))
      })
  }
}