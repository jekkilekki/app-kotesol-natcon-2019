import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import AppText from '../text/AppText'

class SmallButton extends Component {
  render() {
    const { title, color } = this.props

    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={[styles.smallButton, {color: '#fff', backgroundColor: color}, this.props.style]}
      >
        <AppText center style={{fontSize: 10}}>{title}</AppText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  smallButton: {
    // borderWidth: 1,
    // borderColor: 'rgba(21,21,0,0.2)',
    borderRadius: 10,
    // paddingTop: 1,
    // paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 8, 
    marginTop: 10,
    height: 18
  },
})

export default SmallButton