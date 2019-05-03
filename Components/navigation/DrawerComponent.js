import React, { Component } from 'react'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { View, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import AppText from '../shared/text/AppText'
import H2 from '../shared/text/H2'
import ProfileButton from '../shared/buttons/ProfileButton';

class DrawerComponent extends Component {
  navigateToScreen = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    })
    this.props.navigation.dispatch(navigateAction)
  }

  _menuPress = (screen) => {
    this.navigateToScreen(screen)
    this.props.navigation.closeDrawer()
  }

  renderId() {
    const { firstName, lastName, email, img } = this.props.profile 
    let profileImg = img !== '' ? img : 'https://koreatesol.org/sites/default/files/styles/large/public/pictures/knc-2019-default-square.png'
    let userName = firstName !== '' && lastName !== '' ? `${firstName} ${lastName}` : firstName !== '' ? firstName : 'Welcome, Guest'
    let userEmail = email !== '' ? email : 'Login below for full access'

    return (
      <View>
        <Image style={styles.profileImg} source={{uri: profileImg}} />
        <AppText>{userName}</AppText>
        <AppText>{userEmail}</AppText>
      </View>
    )
  }

  renderMenuItems() {
    const MENU = [
      {
        "screen": "Profile",
        "title": "Your Profile"
      },
      {
        "screen": "MySchedule",
        "title": "Your Schedule"
      },
      {
        "screen": "Schedule",
        "title": "Schedule"
      },
      {
        "screen": "Speakers",
        "title": "Speakers"
      },
      {
        "screen": "Map",
        "title": "Location"
      },
      {
        "screen": "About",
        "title": "About"
      },
      {
        "screen": "Welcome",
        "title": "App Tutorial"
      },
    ]

    return (
      MENU.map((item, i) => (
        <TouchableOpacity style={styles.button} onPress={() => this._menuPress(item.screen)}>
          <AppText>{item.title}</AppText>
        </TouchableOpacity>
      ))
    )
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
          <ImageBackground source={require('../../assets/img/splash.png')} style={styles.profileBox}>
            <ProfileButton name={'times'} onPress={() => this.props.navigation.closeDrawer()} />
            {this.renderId()}
          </ImageBackground>
          
          {/* <DrawerItems {...this.props} /> */}

          {this.renderMenuItems()}

          <TouchableOpacity style={styles.button}>
            <AppText style={{fontFamily: 'nunito-bold'}}>Logout</AppText>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileBox: {
    flex: 1, 
    // flexDirection: 'row',
    overflow: 'hidden', 
    // justifyContent: 'center',
    padding: 15,
    marginBottom: 15
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 15,
    marginBottom: 10
  },
  button: {
    // backgroundColor: '#232377',
    padding: 10,
    paddingLeft: 15,
    fontFamily: 'nunito-bold'
  }
})

const mapStateToProps = ({ profile, app }) => {
  return { profile, loggedIn: app.loggedIn }
}

export default connect(mapStateToProps)(DrawerComponent)