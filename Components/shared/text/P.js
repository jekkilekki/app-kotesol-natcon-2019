import React from 'react'

import AppText from './AppText'

const P = (props) => {
  return (
    <AppText 
      style={{paddingBottom: 10, opacity: 0.9}}
    >
      {props.children}
    </AppText>
  )
}

export default P