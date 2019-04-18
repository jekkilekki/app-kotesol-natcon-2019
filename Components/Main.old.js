import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Asset, AppLoading, SplashScreen } from 'expo'
import firebase from 'firebase'

import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from '../utils/_config'

import { Navigation } from './shared/Navigation'
import Loader from './shared/Loader'
import Header from './shared/Header'
import Splash from './shared/Splash'
import Login from './views/user/Login'
import LoginForm from './views/user/LoginFormPhone'
import Register from './views/user/Register'
import RegisterForm from './views/user/RegisterForm'
import Profile from './views/user/Profile'
import SpeakerList from './views/speaker/SpeakerList'

class Main extends Component {
  state = {
    fontLoaded: false,
    dataLoaded: true,
    loggedIn: false
  }

  async componentWillMount() {
    // Make sure Expo fonts are loaded
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  // componentDidMount() {
  //   // Initialize Firebase
  //   const config = {
  //     apiKey,
  //     authDomain,
  //     databaseURL,
  //     projectId,
  //     storageBucket,
  //     messagingSenderId
  //   }
  //   firebase.initializeApp(config)
  // }

  renderInitialView() {
    switch( this.state.loggedIn ) {
      case true: 
        return <Splash />
      case false: 
        return (
          <View>
            <Header pageName='First Page' />
            <RegisterForm />
            <LoginForm />
          </View>
        )
        // return <Splash />
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
      <View style={styles.container}>
        {/* {this.renderInitialView()} */}
        {/* <Text>Hello Sucka!</Text> */}
        <Navigation />
      </View>
    )
  }

  /* TODO: mapStateToProps */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Main