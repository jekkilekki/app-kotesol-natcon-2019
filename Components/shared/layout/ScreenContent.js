import React from 'react'
import { View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const ScreenContent = (props) => {
  return (
    <View style={screenContent}>
      {props.children}
    </View>
  )
}

const screenContent = {
  flex: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight: 15,
  paddingLeft: 15,
  width: width,
}

export default ScreenContent