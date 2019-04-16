import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { firebaseLogoutUser } from '../../actions'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import AppText from '../shared/text/AppText'
import ScreenContent from '../shared/layout/ScreenContent'
import AppInput from '../shared/AppInput'
import ContentButton from '../shared/buttons/ContentButton'

class ProfileScreen extends Component {
  componentDidMount() {
    if ( ! this.props.user ) {
      this.props.navigation.navigate( 'Auth' )
    }
  }

  _onSave = () => {
    // Need to save this data to Firebase - to recall it all later
    this.props.navigation.navigate('Home')
  }

  _onLogout = () => {
    this.props.firebaseLogoutUser()
    this.props.navigation.navigate('Home')
  }

  render() {
    const { user, token } = this.props

    return (
      <AppScreen>
        <AppHeader 
          pageName='Profile' 
          pageSub='Update your info, connect with others'
        />
        <ScreenContent>
          {user && user.picture !== undefined &&
            <Image source={{uri: user.picture.data.url}} style={styles.userImg} />
          }
          <AppInput 
            label='First Name'
            placeholder='Aaron'
            value={user && user.first_name !== undefined ? user.first_name : ''}
            // onChangeText={this._onTextInput}
          />
          <AppInput 
            label='Last Name'
            placeholder='Snowberger'
            value={user && user.last_name !== undefined ? user.last_name : ''}
            // onChangeText={this._onTextInput}
          />
          <AppInput 
            label='Affiliation'
            placeholder='Jeonju University'
            value={this.props.affiliation}
            // onChangeText={this._onTextInput}
          />
          <AppInput 
            label='Short Bio'
            placeholder="I'm a teacher at..."
            value={this.props.shortBio}
            // onChangeText={this._onTextInput}
            multiline
            numberOfLines={6}
          />
          <AppInput 
            label='Email'
            placeholder='john@doe.com'
            value={user && user.email !== undefined ? user.email : ''}
            // onChangeText={this._onTextInput}
          />
          <ContentButton
            title="Save"
            onPress={this._onSave}
          />
          <Button
            title="Logout"
            onPress={this._onLogout}
          />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImg: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    borderRadius: 10
  }
})

const mapStateToProps = ({ auth }) => {
  const { user, token } = auth
  return { user, token }
}

export default connect(mapStateToProps, { firebaseLogoutUser })(ProfileScreen)