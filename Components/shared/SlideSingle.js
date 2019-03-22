import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// If need help / better solution: https://github.com/Jacse/react-native-app-intro-slider/blob/master/AppIntroSlider.js

class SlideSingle extends Component {
  render() {
    const slideStyle = {
      backgroundColor: this.props.color,
      width: this.props.width,
      height: this.props.height,
      paddingBottom: this.props.bottomButton ? 132 : 64
    }

    return (
      <View style={[styles.container, slideStyle]}>
        <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        <Image source={this.props.image} style={this.props.imageStyle} />
        <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 26,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '300',
    paddingHorizontal: 16
  },
  text: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16
  }
})

export default SlideSingle