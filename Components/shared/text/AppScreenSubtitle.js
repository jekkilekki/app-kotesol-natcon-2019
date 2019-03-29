import React from 'react'
import { Text } from 'react-native'

const AppScreenSubtitle = (props) => {
  return (
    <Text style={style}>{props.children}</Text>
  )
}

const style = {
  fontFamily: 'nunito',
  fontSize: 15,
  opacity: 0.75
}

export default AppScreenSubtitle