import { combineReducers } from 'redux'
import appReducer from './AppReducer'
import authReducer from './AuthReducer'
import profileReducer from './ProfileFormReducer'
import speakers from './SpeakersReducer'

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  speakers
})

export default reducers