import { combineReducers } from 'redux'
import appActions from './appActions'
import authActions from './authActions'
import speakers from './speakersReducer'

const reducers = combineReducers({
  app: appActions,
  auth: authActions,
  speakers
})

export default reducers