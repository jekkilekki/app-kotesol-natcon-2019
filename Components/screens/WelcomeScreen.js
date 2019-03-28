import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button, ImageBackground, AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Slides from '../shared/Slides'
import ButtonBottom from '../shared/ButtonBottom'

const SLIDE_DATA = [
  {
    title: 'Welcome!',
    text: 'to the KOTESOL 2019 National Conference App',
    image: '',
    color: '#03a9f4'
  },
  {
    title: 'About',
    text: 'This app was built by Aaron Snowberger.',
    image: '',
    color: '#009688'
  },
  {
    title: 'Sign in!',
    text: 'Click below to sign in to the App',
    image: '',
    color: '#03a9f4'
  }
]

class WelcomeScreen extends Component {
  state = { token: null }

  componentWillMount() {
    this._getFBtoken()
  }

  _getFBtoken = async () => {
    try {
      const token = await AsyncStorage.getItem('fb_token')
      if (token) {
        this.props.navigation.navigate('Schedule')
        this.setState({ token })
      } else {
        this.setState({ token: false })
      }
    } catch (err) {
      // Error retrieving data
    }
  }

  onLoginPress = () => {
    this.props.navigation.navigate('Auth')
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('Home')
  }

  onSlidesNext = () => {
    this.props.scrollToEnd()
  }

  render() {
    if ( this.state.token ) {
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <Slides 
          data={SLIDE_DATA} 
          onLogin={this.onLoginPress}
          onComplete={this.onSlidesComplete} 
          onNext={this.onSlidesNext}
        />
        <ButtonBottom backgroundColor='transparent'>
          <Button title='Skip' onPress={this.onSlidesComplete} />
          <View style={styles.indicator}>
          
          </View>
          <Button title='Next' onPress={this.onSlidesNext} />
        </ButtonBottom>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'nunito'
  }
})

export default WelcomeScreen