import React from 'react'
import { Text } from 'react-native'

const AppScreenTitle = (props) => {
  return (
    <Text style={
      [style, {
        fontSize: props.small ? 22 : 26,
        marginRight: props.center ? 0 : 10,
        textAlign: props.center ? 'center' : 'left'
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