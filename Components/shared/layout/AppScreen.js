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
        <ScrollView>
          {this.props.children}
        </ScrollView>
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
          <ScrollView>
            {this.props.children}
          </ScrollView>
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