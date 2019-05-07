import { combineReducers } from 'redux'
import app from './AppReducer'
import auth from './AuthReducer'
import profile from './ProfileReducer'
import speakers from './SpeakersReducer'
import locations from './LocationsReducer'
import attendees from './AttendeesReducer'

const reducers = combineReducers({
  app,
  auth,
  profile,
  speakers,
  locations,
  attendees
})

export default reducers