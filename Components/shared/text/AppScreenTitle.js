import React from 'react'
import { Text } from 'react-native'

const AppScreenTitle = (props) => {
  return (
    <Text style={
      [style, {
        fontSize: props.small ? 24 : 30
      }
    ]}>
      {props.children}
    </Text>
  )
}

const style = {
  fontFamily: 'futura-bold',
  color: '#fff'
}

export default AppScreenTitle