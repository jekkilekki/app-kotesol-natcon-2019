import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button, ImageBackground, AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
// import { profileGetWithToken } from '../../actions'

import Slides from '../shared/Slides'
import AppFooterButton from '../shared/layout/AppFooterButton'

import { appBlack, appBlue, appDarkBlue, appDarkPurple, appOrange, appPink, appPurple, appTeal } from '../../utils/colors'

const SLIDE_DATA = [
  {
    title: 'Welcome!',
    text: 'to the KOTESOL 2019 National Conference App. Follow this short tutorial to learn what you can do here, or "Skip" it to go straight to the Conference Shedule.',
    // image: 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png',
    // image: '../../assets/img/speakers/knc-2019-default-square.png',
    image: '',
    color: appDarkBlue
  },
  {
    title: 'Conference Schedule',
    text: 'You can view the conference schedule and list of speakers in individual tabs. Click the expand/contract button to view more or less. Search or filter speakers or abstract titles.',
    image: '',
    color: appPurple
  },
  {
    title: 'Discover Jeonju',
    text: 'We\'ve collected a list of 92 different places of interest in 4 neighborhoods in Jeonju. Explore the Jeonju University campus area, the new (or old) downtown areas, and Hanok Village.',
    image: '',
    color: appBlue
  },
  // {
  //   title: 'Find Friends',
  //   text: 'After logging in, you\'ll be able to view the list of other conference attendees. Read their profile and add them to your Friends list.',
  //   image: '',
  //   color: appPink
  // },
  // {
  //   title: 'Login to do more',
  //   text: 'Logging in will also give you the ability to update your own profile. Create your own Schedule by favoriting talks you find interesting, add new Friends and Places to your lists, and access any of them with the "My" buttons located in the Drawer menu.',
  //   image: '',
  //   color: appOrange
  // },
  // {
  //   title: 'Sign in',
  //   text: 'Login with an email or connect with Facebook to get started. Or click "Skip" to view the unprotected content first. You can login later from the Drawer menu.',
  //   image: '',
  //   color: '#00bbbb'
  // }
]

class WelcomeScreen extends Component {
  componentWillMount() {
    const { navigation, loggedIn } = this.props

    if ( loggedIn && !navigation.state.params ) this.props.navigation.navigate('Home')
  }

  onLoginPress = () => {
    this.props.navigation.navigate('Auth')
  }

  // onSlidesComplete = () => {
  //   this.props.navigation.navigate('Home')
  // }

  render() {
    console.log('Welcome props', this.props)
    // if ( !this.props.loggedIn ) {
    //   return <AppLoading />
    // }
    return (
      <View style={styles.container}>
        <Slides 
          data={SLIDE_DATA} 
          onLogin={this.onLoginPress}
          // onComplete={this.onSlidesComplete} 
          // onNext={this.onSlidesNext}
          // ref={'slides'}
        />
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

export default connect(mapStateToProps)(WelcomeScreen)