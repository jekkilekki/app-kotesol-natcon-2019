import React from 'react'
import { Text } from 'react-native'

const AppText = (props) => {
  return (
    <Text style={{fontFamily: 'nunito'}}>{props.children}</Text>
  )
}

export default AppText