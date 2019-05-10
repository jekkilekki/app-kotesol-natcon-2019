import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import AppText from '../text/AppText';

const BubbleTab = (props) => {
  return (
    <View style={styles.bubbleTabBar} >
      {props.tabs.map((tab, i) => (
        <TouchableOpacity key={i} onPress={() => props.navigation.navigate(tab.replace(/\s/g,''))}>
          <AppText style={styles.bubbleTabButton}>{tab}</AppText>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bubbleTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 60,
    marginRight: 60,
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

export default withNavigation(BubbleTab)