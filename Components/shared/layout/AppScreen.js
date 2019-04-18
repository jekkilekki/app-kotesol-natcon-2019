import React, { Component } from 'react'
import { View, SafeAreaView, ImageBackground, ScrollView } from 'react-native'
import { LinearGradient } from 'expo'

import { blue, purple, purpler, purpleDark, purpleDarker, blueDark, blueDarker } from '../../../utils/colors'

class AppScreen extends Component {
  _renderImageBackground() {
    return (
      <ImageBackground 
        source={this.props.image}
        style={{width: '100%', height: '100%'}}
      >
        <View>
          {this.props.children}
        </View>
      </ImageBackground>
    )
  }

  _renderGradientBackground() {
    return (
      <LinearGradient
        colors={[
          this.props.color1 || purpler, 
          this.props.color2 || purpler
        ]}
        style={{flex: 1}}
        start={{x: 0.0, y: 0.25}} 
        end={{x: 0.75, y: 1}}
        locations={[0,1]}
      >
        <View>
          {this.props.children}
        </View>
      </LinearGradient>
    )
  }

  _renderBackground() {
    if ( this.props.image ) {
      return this._renderImageBackground()
    } else if ( this.props.color1 || this.props.color2 ) {
      return this._renderGradientBackground()
    } else if ( this.props.background ) {
      return this._renderGradientBackground()
    } else {
      return (
        <View>
          {this.props.children}
        </View>
      )
    }
  }

  _renderScreen() {
    if ( this.props.safeView ) {
      return (
        <SafeAreaView style={{flex: 1}}>
          {this._renderBackground()}
        </SafeAreaView>
      )
    } else {
      return (
        <View style={{flex: 1}}>
          {this._renderBackground()}
        </View>
      )
    }
  }

  render() {
    return this._renderScreen()
  }
}

export default AppScreen