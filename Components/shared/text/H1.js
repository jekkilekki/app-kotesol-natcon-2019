import React from 'react'

import AppText from './AppText'

const H1 = (props) => {
  return (
    <AppText 
      size={props.small ? 18 : 24}
      fontFamily='futura-bold'
      style={[{
        marginBottom: 10,
        color: props.dark ? '#232377' : '#fff',
        // backgroundColor: props.dark ? 'transparent' : '#232377',
        textAlign: props.center ? 'center' : 'left'
      }, props.style]}
    >
      {props.children}
    </AppText>
  )
}

export default H1