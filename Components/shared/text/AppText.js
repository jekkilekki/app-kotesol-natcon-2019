import React, { Component } from 'react'
import { Text } from 'react-native'

const AppText = (props) => {
  return (
    <Text 
      style={[{
        fontFamily: props.bold ? 'nunito-bold' : 'nunito',
        textAlign: props.center ? 'center' : 'left',
        padding: props.padding ? 10 : 0
      }, 
      props.style]}
    >
      {props.children}
    </Text>
  )
}

export default AppText