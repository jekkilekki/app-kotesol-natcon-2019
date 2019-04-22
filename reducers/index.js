import { combineReducers } from 'redux'
import app from './AppReducer'
import auth from './AuthReducer'
import profile from './ProfileReducer'
import speakers from './SpeakersReducer'

const reducers = combineReducers({
  app,
  auth,
  profile,
  speakers
})

export default reducers