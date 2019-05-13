import React from 'react'

import AppText from './AppText'

const H3 = (props) => {
  return (
    <AppText 
      size={25} 
      fontFamily={'nunito-black'}
      style={[{
        color: props.dark ? '#151537' : '#fff',
        fontSize: props.small ? 10 : 16,
        textTransform: props.small ? 'uppercase' : 'capitalize',
        paddingTop: 20,
        paddingBottom: 5,
        textAlign: props.center ? 'center' : 'left'
      }, props.style]}
    >
      {props.children}
    </AppText>
  )
}

export default H3