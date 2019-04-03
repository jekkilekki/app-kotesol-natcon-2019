import React from 'react'

import AppText from './AppText'

const H1 = (props) => {
  return (
    <AppText 
      size={24}
      fontFamily='futura-bold'
      style={{paddingBottom: 10}}
    >
      {props.children}
    </AppText>
  )
}

export default H1