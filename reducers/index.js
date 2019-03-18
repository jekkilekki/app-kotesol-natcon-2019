import { combineReducers } from 'redux'
import authedUser from './authedUser'

const reducer = combineReducers({
  authedUser,
})

export default reducer