import React from 'react'

import AppText from './AppText'

const H2 = (props) => {
  return (
    <AppText 
      size={props.small ? 16 : 24}
      fontFamily={ props.normal ? 'nunito' : 'nunito-black' }
      style={[{
        paddingBottom: 10,
        color: props.dark ? '#232377' : '#fff',
        textAlign: props.center ? 'center' : 'left'
      }, props.style]}
    >
      {props.children}
    </AppText>
  )
}

export default H2