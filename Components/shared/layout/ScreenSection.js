import React from 'react'
import { View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const ScreenSection = (props) => {
  return (
    <View style={screenSection}>
      {props.children}
    </View>
  )
}

const screenSection = {
  borderTopWidth: 1,
  borderColor: 'rgba(0,221,221,0.1)',
  paddingTop: 30,
  paddingBottom: 20,
  marginBottom: 20
}

export default ScreenSection