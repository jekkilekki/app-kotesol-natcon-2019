import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import firebase from 'firebase'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import AppText from '../shared/text/AppText'

class ProfileScreen extends Component {
  _onLogout = () => {
    firebase.auth().signOut()
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='Profile' 
          pageSub='Update your info, connect with others'
        />
        <AppText>ProfileScreen</AppText>
        <Button
            title="Logout"
            onPress={this._onLogout}
          />
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProfileScreen