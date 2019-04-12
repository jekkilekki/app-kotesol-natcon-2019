import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'
import logger from '../middleware/logger'

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk, logger)
  )
)

export default store