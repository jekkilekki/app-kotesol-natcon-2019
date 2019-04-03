import React from 'react'
import { Text } from 'react-native'

const AppScreenTitle = (props) => {
  return (
    <Text style={style}>{props.children}</Text>
  )
}

const style = {
  fontFamily: 'futura-bold',
  fontSize: 30,
  color: '#fff'
}

export default AppScreenTitle