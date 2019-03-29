import React, { Component } from 'react'
import { View, SafeAreaView, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo'

import { blue, purple, purpleDark } from '../../../utils/colors'

class AppScreen extends Component {
  _renderImageBackground() {
    return (
      <ImageBackground 
        source={this.props.image}
        style={{width: '100%', height: '100%'}}
      >
        {this.props.children}
      </ImageBackground>
    )
  }

  _renderGradientBackground() {
    return (
      <LinearGradient
          colors={[
            this.props.color1 || blue, 
            this.props.color2 || purple
          ]}
          style={{flex: 1}}
          start={{x: 0.0, y: 0.25}} 
          end={{x: 0.75, y: 1}}
          locations={[0,1]}
        >
          {this.props.children}
        </LinearGradient>
    )
  }

  render() {
    return this.props.safeView
      ? (
        <SafeAreaView style={{flex: 1}}>
          {this.props.image 
            ? this._renderImageBackground()
            : this._renderGradientBackground()
          }
        </SafeAreaView>
      )
      : (
        <View style={{flex: 1}}>
          {this.props.image 
            ? this._renderImageBackground()
            : this._renderGradientBackground()
          }
        </View>
      )
  }
}

export default AppScreen