import React from 'react'

import AppText from './AppText'

const H1 = (props) => {
  return (
    <AppText 
      size={props.small ? 18 : 24}
      fontFamily='futura-bold'
      style={{
        paddingBottom: 10,
        color: props.dark ? '#232377' : '#fff'
      }}
    >
      {props.children}
    </AppText>
  )
}

export default H1