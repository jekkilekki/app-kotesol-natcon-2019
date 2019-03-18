import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Platform } from 'react-native'
import { Asset, AppLoading, SplashScreen } from 'expo'
import firebase from 'firebase'

// import { Navigation } from './shared/Navigation'
import Loader from './shared/Loader'
import Splash from './shared/Splash'
// import Login from './views/Login'

class Main extends Component {
  state = {
    fontLoaded: false,
    dataLoaded: false
  }

  async componentWillMount() {

    /* TODO: Firebase stuff */

    // Make sure Expo fonts are loaded
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ fontLoaded: true })

  }

  renderInitialView() {
    switch( this.state.loggedIn ) {
      case true: 
        return <Splash />
      case false: 
        // return <Login />
        return <Splash />
      default:
        return <Splash />
    }
  }

  render() {
    
    // If the data isn't yet loaded, show nothing
    if ( !this.state.fontLoaded ) {
      return null
    }

    if ( !this.state.dataLoaded ) {
      return <Loader />
    }

    return (
      <View style={{flex: 1}}>
        {this.renderInitialView()}
      </View>
    )
  }

  /* TODO: mapStateToProps */
}

export default Main