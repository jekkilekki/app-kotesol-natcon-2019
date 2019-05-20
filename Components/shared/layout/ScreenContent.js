import React from 'react'
import { View, ScrollView, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const ScreenContent = (props) => {
  return (
    <ScrollView style={[screenContent, 
      {
        paddingLeft: props.noPadding ? 0 : 15,
        paddingRight: props.noPadding ? 0 : 15 
      },
      props.style]} bounces={props.bounces}>
      {props.children}
    </ScrollView>
  )
}

// Height of TabBar = 60, height of AppHeader = 139 (iOS) || 110 (Android)
const screenContent = {
  // flex: 1,
  backgroundColor: 'transparent',
  paddingTop: 10,
  paddingBottom: 10,
  // paddingRight: 15,
  // paddingLeft: 15,
  // marginBottom: 100,
  width: width,
  // height: height - 250
}

export default ScreenContent