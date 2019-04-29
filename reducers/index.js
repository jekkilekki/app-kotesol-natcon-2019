import { combineReducers } from 'redux'
import app from './AppReducer'
import auth from './AuthReducer'
import profile from './ProfileReducer'
import speakers from './SpeakersReducer'
import locations from './LocationsReducer'

const reducers = combineReducers({
  app,
  auth,
  profile,
  speakers,
  locations
})

export default reducers