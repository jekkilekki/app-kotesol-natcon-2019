import React from 'react'

import AppText from './AppText'

const H3 = (props) => {
  return (
    <AppText 
      size={25} 
      fontFamily={'nunito-black'}
      style={[{
        fontSize: props.small ? 10 : 14,
        textTransform: props.small ? 'uppercase' : 'capitalize',
        paddingTop: 20,
        paddingBottom: 5
      }, props.style]}
    >
      {props.children}
    </AppText>
  )
}

export default H3