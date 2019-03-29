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
  paddingRight: 10,
  paddingLeft: 10,
  width: width,
  height: height
}

export default ScreenContent