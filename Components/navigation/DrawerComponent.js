import React, { Component } from 'react'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { View, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { firebaseLogoutUser } from '../../actions'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import AppText from '../shared/text/AppText'
import H2 from '../shared/text/H2'
import ProfileButton from '../shared/buttons/ProfileButton'
import ContentButton from '../shared/buttons/ContentButton'

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

  _onLogout = () => {
    this.props.firebaseLogoutUser()
    this.props.navigation.closeDrawer()
    this.props.navigation.navigate('Home')
  }

  renderId() {
    const { firstName, lastName, email, img } = this.props.profile 
    let profileImg = img !== '' ? img : 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png'
    let userName = firstName !== '' && lastName !== '' ? `${firstName} ${lastName}` : firstName !== '' ? firstName : 'Welcome, Guest'
    // let userEmail = email !== '' ? email : 'Login below for full access'

    return (
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.profileImg} source={{uri: profileImg}} />
        <View>
          <AppText>{userName}</AppText>
          {email
            ? <ContentButton
                title="Logout"
                icon="logout"
                onPress={() => this._onLogout()}
              />
            : <ContentButton
                title="Login"
                icon="login"
                onPress={() => this.props.navigation.navigate('Auth')}
              />
          }
        </View>
      </View>
    )
  }

  renderMenuIcon(button) {
    switch(button) {
      case 'Profile': return null
      case 'MySchedule': return null
      case 'Schedule': return <MaterialCommunityIcon name='calendar-clock' size={20} />
      case 'Speakers': return <EntypoIcon name='modern-mic' size={20} />
      case 'Map': return <FoundationIcon name='map' size={20} />
      case 'About': return <EntypoIcon name='info-with-circle' size={20} />
      case 'More': return <EntypoIcon name='grid' size={20} />
      case 'Welcome': return null
      case 'Attendees': return null
      default: return null
    }
  }

  renderMenuItems() {
    const { loggedIn } = this.props

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
        "screen": "More",
        "title": "More"
      },
      {
        "screen": "Welcome",
        "title": "App Tutorial"
      },
    ]

    return (
      MENU.map((item, i) => {(
        !( !loggedIn && item.screen === 'Profile' || !loggedIn && item.screen === 'MySchedule' ) ?
        <TouchableOpacity key={i} style={styles.button} onPress={() => this._menuPress(item.screen)}>
          {/* {this.renderMenuIcon(item.screen)} */}
          <AppText>{item.title}</AppText>
        </TouchableOpacity>
        : null
      )})
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

          <ContentButton
                title="Logout"
                icon="logout"
                onPress={() => this._onLogout()}
              />
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
  },
  logoutButton: {
    marginLeft: 15,
    marginRight: 15
  }
})

const mapStateToProps = ({ profile, app }) => {
  return { profile, loggedIn: app.loggedIn }
}

export default connect(mapStateToProps, { firebaseLogoutUser })(DrawerComponent)