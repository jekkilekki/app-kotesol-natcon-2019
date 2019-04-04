import { combineReducers } from 'redux'
import auth from './authActions'
import speakers from './speakersReducer'

const reducers = combineReducers({
  auth: () => { return {} },
  speakers
})

export default reducers