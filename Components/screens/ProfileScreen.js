import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Image, Picker, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { firebaseLogoutUser, profileFieldUpdate, profileSave } from '../../actions'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import AppText from '../shared/text/AppText'
import ScreenContent from '../shared/layout/ScreenContent'
import AppInput from '../shared/AppInput'
import ContentButton from '../shared/buttons/ContentButton'
import { purpler } from '../../utils/colors';
import AppScreenTitle from '../shared/text/AppScreenTitle';
import AppScreenSubtitle from '../shared/text/AppScreenSubtitle';
import Loader from '../shared/Loader';
import AppModal from '../shared/layout/AppModal';

class ProfileScreen extends Component {
  state = {
    showModal: false
  }

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
    this.setState({ showModal: false })
    // this.props.navigation.navigate('Home')
  }

  _onLogout = () => {
    this.props.firebaseLogoutUser()
    this.props.navigation.navigate('Home')
  }

  render() {
    const { user, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, myPlaces } = this.props

    if ( user === null ) return <Loader />

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <AppHeader 
          pageName='Profile' 
          pageSub='Update your info, connect with others'
          noShadow
        />
        
        <ScreenContent>
        {user && 
          <View style={styles.profileTop}>
            <TouchableOpacity onPress={() => this.setState({ showModal: !this.state.showModal })} >
              <Image source={{uri: img}} style={styles.userImg} />
            </TouchableOpacity>
            <View style={styles.infoBox}>
              <AppScreenTitle>{firstName || ''} {lastName || ''}</AppScreenTitle>
              <AppScreenSubtitle>{affiliation}</AppScreenSubtitle>
            </View>
          </View>
        }

        <View style={styles.profileStats}>
          <View>
            <H3>{mySchedule.length}</H3>
            <AppText>Favorited Talks</AppText>
          </View>
          <View>
            <H3>{myFriends.length}</H3>
            <AppText>Friends</AppText>
          </View>
          <View>
            <H3>{myPlaces.length}</H3>
            <AppText>Favorited Places</AppText>
          </View>
        </View>

        <AppInput style={styles.profileInput}
          label='First Name'
          placeholder='Aaron'
          value={firstName}
          onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'firstName', value })}
        />
        <AppInput style={styles.profileInput}
          label='Last Name'
          placeholder='Snowberger'
          value={lastName}
          onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'lastName', value })}
        />
        <AppInput style={styles.profileInput}
          label='Affiliation'
          placeholder='Jeonju University'
          value={affiliation}
          onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'affiliation', value })}
        />
        <AppInput style={styles.profileInput}
          label='Short Bio'
          placeholder="I'm a teacher at..."
          value={shortBio}
          onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'shortBio', value })}
          multiline
          numberOfLines={6}
        />
        <AppInput style={styles.profileInput}
          label='Email'
          placeholder='john@doe.com'
          value={email}
          onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'email', value })}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
        <AppModal visible={this.state.showModal} onClose={() => this.setState({ showModal: false })} onSave={() => this._onSave()} onLogout={() => this._onLogout()} />
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
    borderRadius: 50
  },
  profileTop: {
    backgroundColor: purpler,
    alignItems: 'center',
    margin: -15,
    marginBottom: 15,
    paddingTop: 15,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'space-between'
  },
  infoBox: {
    marginTop: 10,
    marginBottom: 15
  },
  profileInput: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: '#151537'
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