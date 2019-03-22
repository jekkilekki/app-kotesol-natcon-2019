import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native'

import Slides from '../shared/Slides'

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
  onSlidesComplete = () => {
    this.props.navigation.navigate('home')
  }

  render() {
    return (
      <View style={styles.container}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default WelcomeScreen