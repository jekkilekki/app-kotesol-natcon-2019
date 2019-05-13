import React from 'react'
import { Text } from 'react-native'

const AppScreenSubtitle = (props) => {
  return (
    <Text style={[style,
      {textAlign: props.center ? 'center' : 'left'},
      props.style
    ]}>{props.children}</Text>
  )
}

const style = {
  fontFamily: 'nunito',
  fontSize: 13,
  color: '#fff',
  opacity: 0.75,
  marginTop: 2
}

export default AppScreenSubtitle