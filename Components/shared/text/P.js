import React from 'react'

import AppText from './AppText'

const P = (props) => {
  return (
    <AppText 
      style={[{
        paddingBottom: 10, 
        opacity: 0.9,
        fontSize: props.note || props.small ? 12 : 15,
        color: props.dark ? props.note || props.small ? 'rgba(0,0,0,0.7)' : '#232377' : '#fff',
        marginTop: props.note || props.small ? -10 : 0,
        textAlign: props.center ? 'center' : 'left'
      }, props.style]}
    >
      {props.children}
    </AppText>
  )
}

export default P