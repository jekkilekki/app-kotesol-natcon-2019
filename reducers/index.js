import { combineReducers } from 'redux'
import auth from './authActions'

const reducers = combineReducers({
  auth: () => { return {} },
})

export default reducers