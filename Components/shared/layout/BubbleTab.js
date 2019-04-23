import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import AppText from '../text/AppText';

const BubbleTab = (props) => {
  return (
    <View style={styles.bubbleTabBar} >
      {props.tabs.map((tab, i) => (
        <TouchableOpacity key={i}>
          <AppText style={styles.bubbleTabButton}>{tab}</AppText>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bubbleTabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#232377',
    borderRadius: 15
  },
  bubbleTabButton: {
    fontFamily: 'futura',
    fontSize: 15,
    color: '#232377',
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default BubbleTab