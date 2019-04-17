import { combineReducers } from 'redux'
import appActions from './appActions'
import authActions from './authActions'
import profileReducer from './profileFormReducer'
import speakers from './speakersReducer'

const reducers = combineReducers({
  app: appActions,
  auth: authActions,
  profile: profileReducer,
  speakers
})

export default reducers