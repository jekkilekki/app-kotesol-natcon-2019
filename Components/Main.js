import React, { Component } from 'react'
// import { View, Text, Image, Platform, StatusBar, StyleSheet } from 'react-native'
import { AppLoading, Asset, Font, Icon } from 'expo'
import { AppNavigation } from './navigation/AppNav';
import { connect } from 'react-redux'
import { appReady } from '../actions'

// cacheImages = (images) => {
//   return images.map(image => {
//     if (typeof image === 'string') {
//       return Image.prefetch(image)
//     } else {
//       return Asset.fromModule(image).downloadAsync()
//     }
//   })
// }

// cacheFonts = (fonts) => {
//   return fonts.map(font => Font.loadAsync(font))
// }

class Main extends Component {
  state = {
    ready: false
  }

  _loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([

      ]),
      Font.loadAsync({
        ...Icon.Entypo.font,
        ...Icon.Foundation.font,
        ...Icon.FontAwesome.font,
        ...Icon.MaterialIcons.font,
        ...Icon.MaterialCommunityIcons.font,
        'nunito': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
        'nunito-bold': require('../assets/fonts/Nunito/Nunito-Bold.ttf'),
        'nunito-black': require('../assets/fonts/Nunito/Nunito-Black.ttf'),
        'futura': require('../assets/fonts/Futura/Futura-Condensed-Medium.otf'),
        'futura-bold': require('../assets/fonts/Futura/Futura-Condensed-Bold.otf')
      })
    ])
  }

  _appLoaded = () => {
    this.setState({ ready: true })
    this.props.appReady()
  }

  render() {
    if ( !this.state.ready ) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this._appLoaded()}
          onError={console.warn}
        />
      )
    }

    return <AppNavigation loggedIn={this.props.loggedIn} />
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { appReady })(Main)