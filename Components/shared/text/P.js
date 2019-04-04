import React from 'react'

import AppText from './AppText'

const P = (props) => {
  return (
    <AppText 
      style={{
        paddingBottom: 10, 
        opacity: 0.9,
        fontSize: props.note ? 12 : 15,
        color: props.dark ? '#232377' : '#fff'
      }}
    >
      {props.children}
    </AppText>
  )
}

export default P