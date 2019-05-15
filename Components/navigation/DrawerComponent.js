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
import ScreenSection from '../shared/layout/ScreenSection';

class DrawerComponent extends Component {
  navigateToScreen = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: route === 'Welcome' ? { overrideRedirect: true } : ''
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
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Image style={styles.profileImg} source={{uri: profileImg}} />
        <View>
          <AppText>{userName}</AppText>
          {this.props.loggedIn
            ? <View style={{flexDirection: 'row'}}>
                <ContentButton small 
                  style={{marginRight: 5}}
                  title="Profile"
                  icon="logout"
                  onPress={() => this._menuPress('Profile')}
                />
                <ContentButton small
                  title="Logout"
                  icon="logout"
                  onPress={() => this._onLogout()}
                />
              </View>
            : <ContentButton small
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
      case 'Schedule': return <MaterialCommunityIcon name='calendar-clock' size={20} style={styles.icon} />
      case 'Privacy': return <MaterialCommunityIcon name='cellphone-lock' size={20} style={[styles.icon]} />
      case 'Speakers': return <EntypoIcon name='modern-mic' size={20} style={styles.icon} />
      case 'Map': return <FoundationIcon name='map' size={20} style={styles.icon} />
      // case 'MyPlaces': return <EntypoIcon name='location-pin' size={20} style={[styles.icon, {marginLeft: 20}]} />
      case 'People': return <FoundationIcon name='torsos-female-male' size={20} style={styles.icon} />
      case 'Conduct': return <FoundationIcon name='clipboard-notes' size={20} style={[styles.icon, {paddingLeft: 3}]} />
      case 'About': return <EntypoIcon name='info-with-circle' size={20} style={styles.icon} />
      // case 'Profile': return <MaterialCommunityIcon name='settings' size={20} style={[styles.icon, {marginLeft: 20}]} />
      case 'Welcome': return <MaterialCommunityIcon name='teach' size={20} style={[styles.icon]} />
      // case 'More': return <EntypoIcon name='grid' size={20} style={[styles.icon]} />
      default: return null
    }
  }

  renderMenuItems() {
    const MENU = [
      { "screen": "Schedule", "title": "Schedule", "subscreen": {
        "screen": "MySchedule", "title": "My Schedule"
      }},
      // { "screen": "MySchedule", "title": "My Schedule" },
      { "screen": "Speakers", "title": "Speakers" },
      { "screen": "Map", "title": "Location", "subscreen": {
        "screen": "MyPlaces", "title": "My Places"
      }},
      // { "screen": "MyPlaces", "title": "My Places" },
      { "screen": "People", "title": "Attendees", "subscreen": {
        "screen": "MyFriends", "title": "My Friends"
      }},
      // { "screen": "MyFriends", "title": "My Friends" },
      { "screen": "About", "title": "About", "submenu": [
        { "screen": "Conduct", "title": "Code of Conduct" },
        { "screen": "Privacy", "title": "Privacy Policy" },
        { "screen": "Welcome", "title": "How to use this App" },
        // { "screen": "More", "title": "More" },
      ]},
      // { "screen": "Profile", "title": "Update Profile" },
    ]

    const { loggedIn } = this.props

    return (
      MENU.map((item, i) => (
        ( !loggedIn && item.screen === 'Profile' 
        || !loggedIn && item.screen === 'MySchedule'
        || !loggedIn && item.screen === 'MyPlaces'
        || !loggedIn && item.screen === 'MyFriends' )
        ? null
        : <View key={i} style={{flexDirection: item.submenu ? 'column' : 'row'}}>
            <TouchableOpacity style={styles.button} onPress={() => this._menuPress(item.screen)}>
              {this.renderMenuIcon(item.screen)}
              <AppText>{item.title}</AppText>
            </TouchableOpacity>
            {loggedIn && item.subscreen && 
              <ContentButton small
                title={item.subscreen.title}
                onPress={() => this._menuPress(item.subscreen.screen)}
              />
            }
            {item.submenu && 
              <ScreenSection
                style={{marginTop: 10, paddingTop: 10}}
              >
                {this.renderSubMenu(item.submenu)}
              </ScreenSection>
            }
          </View>
      ))
    )
  }

  renderSubMenu(submenu) {
    return (
      submenu.map((item, i) => (
        <TouchableOpacity key={i} style={styles.button} onPress={() => this._menuPress(item.screen)}>
          {this.renderMenuIcon(item.screen)}
          <AppText>{item.title}</AppText>
        </TouchableOpacity>
      )
    ))
  }

  render() {
    const { loggedIn } = this.props

    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
          <ImageBackground source={require('../../assets/img/splash.png')} style={styles.profileBox}>
            <ProfileButton name={'times'} onPress={() => this.props.navigation.closeDrawer()} cancelButton />
            {this.renderId()}
          </ImageBackground>
          
          {/* <DrawerItems {...this.props} /> */}

          {this.renderMenuItems()}

          {/* {loggedIn
            ? <ContentButton style={styles.logoutButton}
                title="Logout"
                icon="logout"
                onPress={() => this._onLogout()}
              />
            : null
          } */}
          
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
  },
  button: {
    // backgroundColor: '#232377',
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
    fontFamily: 'nunito-bold'
  },
  icon: {
    color: 'rgba(255,255,255,0.7)',
    marginRight: 10
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