import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('window')

class AppFooterButton extends Component {
  render() {
    return (
      <View style={[styles.buttonStyle, {
        backgroundColor: this.props.backgroundColor || 'transparent',
        color: this.props.color || 'black'
      }]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: 70,
    paddingTop: 20,
    paddingBottom: 20,
    width: width,
    justifyContent: 'space-around',
    alignItems: 'center',
    color: '#fff'
  },
})

export default AppFooterButton