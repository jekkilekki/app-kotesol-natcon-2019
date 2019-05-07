import React, { Component } from 'react'
import { Text } from 'react-native'

const AppText = (props) => {
  return (
    <Text 
      style={[{
        fontFamily: props.fontFamily ? props.fontFamily : 'nunito',
        textAlign: props.center ? 'center' : 'left',
        padding: props.padding ? 10 : 0,
        fontSize: props.size ? props.size : 15,
        color: props.color ? props.color : props.dark ? '#232377' : '#fff'
      }, 
      props.style]}
    >
      {props.children}
    </Text>
  )
}

export default AppText