const logger = (store) => (next) => (action) => {
  console.group( action.type )
    const returnValue = next(action)
    // Disable if too much data, major slowdown in performance when logging New state
    console.log( 'New state: ', store.getState() )
  console.groupEnd()
  return returnValue
}

export default logger