import { combineReducers } from 'redux'
import AuthActions from './authActions'
import speakers from './speakersReducer'

const reducers = combineReducers({
  auth: AuthActions,
  speakers
})

export default reducers