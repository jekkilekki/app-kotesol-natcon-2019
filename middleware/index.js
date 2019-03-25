import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from './logger'

export default applyMiddleware(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  thunk,
  logger
)