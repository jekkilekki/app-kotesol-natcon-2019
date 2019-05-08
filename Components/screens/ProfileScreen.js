import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Image, Picker } from 'react-native'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { firebaseLogoutUser, profileFieldUpdate, profileSave } from '../../actions'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import AppText from '../shared/text/AppText'
import ScreenContent from '../shared/layout/ScreenContent'
import AppInput from '../shared/AppInput'
import ContentButton from '../shared/buttons/ContentButton'

class ProfileScreen extends Component {
  componentDidMount() {
    // if ( ! this.props.user ) {
    //   this.props.navigation.navigate( 'Auth' )
    // }
    this.props.navigation.closeDrawer()
  }

  _onSave = () => {
    // Need to save this data to Firebase - to recall it all later
    // const { profile, navigation } = this.props // maybe we don't need to destructure it
    const { img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, navigation } = this.props
    this.props.profileSave({ img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, navigation })
    this.props.navigation.navigate('Home')
  }

  _onLogout = () => {
    this.props.firebaseLogoutUser()
    this.props.navigation.navigate('Home')
  }

  render() {
    const { user, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule } = this.props

    return (
      <AppScreen background>
        <AppHeader 
          pageName='Profile' 
          pageSub='Update your info, connect with others'
          noShadow
        />
        <ScreenContent>
          {user && 
            <Image source={{uri: img}} style={styles.userImg} />
          }
          <AppInput 
            label='First Name'
            placeholder='Aaron'
            value={firstName}
            onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'firstName', value })}
          />
          <AppInput 
            label='Last Name'
            placeholder='Snowberger'
            value={lastName}
            onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'lastName', value })}
          />
          <AppInput 
            label='Affiliation'
            placeholder='Jeonju University'
            value={affiliation}
            onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'affiliation', value })}
          />
          <AppInput 
            label='Short Bio'
            placeholder="I'm a teacher at..."
            value={shortBio}
            onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'shortBio', value })}
            multiline
            numberOfLines={6}
          />
          <AppInput 
            label='Email'
            placeholder='john@doe.com'
            value={email}
            onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'email', value })}
            autoCorrect={false}
            autoCapitalize={'none'}
          />
          {/* <Picker
            style={{ flex: 1 }}
            selectedValue={this.props.room}
            onValueChange={(value) => this.props.profileFieldUpdate({ prop: 'room', value })}
          >
            <Picker.Item label='101' value='101' />
            <Picker.Item label='102' value='102' />
            <Picker.Item label='201' value='201' />
            <Picker.Item label='202' value='202' />
            <Picker.Item label='203' value='203' />
            <Picker.Item label='204' value='204' />
          </Picker> */}
          <ContentButton
            title="Save"
            onPress={() => this._onSave()}
            disabled={firstName === '' || lastName === ''}
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

const mapStateToProps = ({ auth, profile }) => {
  const { user } = auth
  const { img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule } = profile
  
  if ( user !== null ) {
    return { user,  
      img,
      firstName,
      lastName, affiliation, shortBio, 
      email, 
      myFriends, mySchedule 
    }
  }

  return { user, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule }
}

export default connect(mapStateToProps, { 
  firebaseLogoutUser, profileFieldUpdate, profileSave
})(ProfileScreen)