import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button, ImageBackground, AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { profileGetWithToken } from '../../actions'

import Slides from '../shared/Slides'
import ButtonBottom from '../shared/layout/AppFooterButton'

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
  state = { 
    slideNum: 0
  }

  componentWillMount() {
    const { navigation, loggedIn } = this.props

    if ( loggedIn && !navigation.state.params ) this.props.navigation.navigate('Profile')
  }

  onLoginPress = () => {
    this.props.navigation.navigate('Auth')
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('Home')
  }

  onSlidesNext = () => {
    alert('sliding!')
    if ( this.state.slideNum === 2 ) {
      this.setState({ slideNum: 0 })
    } else {
      this.setState({ slideNum: this.state.slideNum+1 })
    }
    this.slide.scrollTo( this.state.slideNum )
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
          ref={'slides'}
        />
        <ButtonBottom backgroundColor='transparent'>
          <Button title='Skip' onPress={this.onSlidesComplete} />
          <View style={styles.indicator}>
          
          </View>
          <Button title='Next' onPress={() => this.refs.slides.scrollToEnd()} />
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

const mapStateToProps = ({ profile, app }) => {
  return { profile, loggedIn: app.loggedIn }
}

export default connect(mapStateToProps, { profileGetWithToken })(WelcomeScreen)