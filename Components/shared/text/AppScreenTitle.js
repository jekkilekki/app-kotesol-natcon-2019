import React from 'react'
import { Text } from 'react-native'

const AppScreenTitle = (props) => {
  return (
    <Text style={style}>{props.children}</Text>
  )
}

const style = {
  fontFamily: 'futura',
  fontSize: 30
}

export default AppScreenTitle