import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Image, Picker, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { firebaseLogoutUser, profileFieldUpdate, profileSave, profileTemp, profileReset } from '../../actions'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import H3 from '../shared/text/H3'
import H2 from '../shared/text/H2'
import P from '../shared/text/P'
import AppText from '../shared/text/AppText'
import ScreenContent from '../shared/layout/ScreenContent'
import AppInput from '../shared/AppInput'
import ContentButton from '../shared/buttons/ContentButton'
import { purpler, appTeal, appPurple, appGrey30 } from '../../utils/colors';
import AppScreenTitle from '../shared/text/AppScreenTitle';
import AppScreenSubtitle from '../shared/text/AppScreenSubtitle';
import Loader from '../shared/Loader';
import ProfileModal from '../views/user/ProfileModal'
import ProfilePhotoModal from '../views/user/ProfilePhotoModal'
import HeaderBack from '../shared/layout/HeaderBack'
import ProfileEditButton from '../ProfileEditButton'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'

const { width, height } = Dimensions.get('window')

class ProfileScreen extends Component {
  state = {
    showImgModal: false,
    showProfileModal: false,
    // tempProfile: this.props.profile
  }

  componentDidMount() {
    this.props.profileTemp()
    this.props.navigation.closeDrawer()
  }

  _openModal = (modal) => {
    if ( modal === 'image' ) {
      this.setState({ showImgModal: true })
    } else if ( modal === 'profile' ) {
      this.setState({ showProfileModal: true })
    } else {
      this.setState({
        showImgModal: false,
        showProfileModal: false
      })
    }
  }

  _onSave = () => {
    const { profile } = this.props // maybe we don't need to destructure it
    const { uid, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, myPlaces, displayInfo, secretKey } = profile
    // Close the modals
    this.setState({ showProfileModal: false, showImgModal: false })
    // Save our profile
    this.props.profileSave({ uid, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, myPlaces, displayInfo, secretKey })
    // Get a new temp profile
    this.props.profileTemp()
  }

  _onClose = () => {
    const { profileTemp } = this.props
    // Close the modals
    this.setState({ showProfileModal: false, showImgModal: false })
    // Save our profile back to the original
    this.props.profileReset()
  }

  _onLogout = () => {
    this.props.firebaseLogoutUser()
    this.props.navigation.navigate('Home')
  }

  render() {
    const { profile } = this.props
    const { uid, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, myPlaces, displayInfo, secretKey } = profile

    // if ( user === null ) return <Loader />

    return (
      <AppScreen>
        {this.props.navigation.params 
          ? <HeaderBack backPage={this.props.navigation.params.backPage} />
          : <HeaderBack />
        }
        
        <ScreenContent>
        {/* {user &&  */}
          <View style={styles.profileTop}>
            <TouchableOpacity onPress={() => this._openModal('image')} >
              
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._openModal('image')} style={styles.userImgContainer}>
              <Image source={{uri: img || 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png'}} style={styles.userImg} />
              <ProfileEditButton large style={{right: 0, bottom: 0, zIndex: 0}} onPress={() => this._openModal('image')} />
            </TouchableOpacity>
            <ProfileEditButton large style={{right: 15, bottom: 20, zIndex: 20}} onPress={() => this._openModal('profile')} />
            <View style={styles.infoBox}>
              <AppScreenTitle center>{firstName || ''} {lastName || ''}</AppScreenTitle>
              <AppScreenSubtitle center>{affiliation}</AppScreenSubtitle>
            </View>
          </View>
        {/* } */}

        <View style={styles.profileStats}>
          <TouchableOpacity style={styles.profileStatBox} onPress={() => this.props.navigation.navigate('MySchedule')}>
            <H2 normal center style={{paddingBottom: 0, color: appPurple}}>{mySchedule === [] || mySchedule === undefined ? '0' : mySchedule.length}</H2>
            <P dark center style={{paddingBottom: 0}}>Talks</P>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileStatBox} onPress={() => this.props.navigation.navigate('MyFriends')}>
            <H2 normal center style={{paddingBottom: 0, color: appPurple}}>{myFriends === [] || myFriends === undefined ? '0' : myFriends.length}</H2>
            <P dark center style={{paddingBottom: 0}}>Friends</P>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileStatBox} onPress={() => this.props.navigation.navigate('MyPlaces')}>
            <H2 normal center style={{paddingBottom: 0, color: appPurple}}>{myPlaces === [] || myPlaces === undefined ? '0' : myPlaces.length}</H2>
            <P dark center style={{paddingBottom: 0}}>Places</P>
          </TouchableOpacity>
        </View>

        <View>
          <H3 dark>My Profile</H3>
          <P dark>{shortBio}</P>
          <ContentButton
            opaque
            style={{marginTop: 25, marginBottom: 10}}
            title="View Schedule"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <ContentButton
            title="Logout"
            onPress={() => this._onLogout()}
          />
        </View>

        <ProfileModal 
          visible={this.state.showProfileModal} 
          onClose={() => this._onClose()} 
          onSave={() => this._onSave()}
          onLogout={() => this._onLogout()} 
        />
        <ProfilePhotoModal visible={this.state.showImgModal} 
          onClose={() => this._onClose()} 
          onSave={() => this._onSave()} 
          onLogout={() => this._onLogout()} 
        />
        <ScreenBottomPadding size={140} /> 
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
  userImgContainer: {
    backgroundColor: appGrey30,
    height: 150,
    width: 150,
    borderRadius: 75
  },
  userImg: {
    backgroundColor: 'white',
    height: 150,
    width: 150,
    borderRadius: 75
  },
  userImgText: {

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
    justifyContent: 'space-between',
    backgroundColor: 'rgba(169,186,201,0.5)',
    marginLeft: -15,
    marginRight: -15,
    marginTop: -15,
    
  },
  profileStatBox: {
    width: width / 3,
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 15,
    paddingBottom: 15
  },
  infoBox: {
    marginTop: 10,
    marginBottom: 15
  },
  profileInput: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: '#151537'
  },
  speakerImgContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: purpler,
    marginLeft: -15,
    marginRight: -15,
    padding: 15,
    paddingTop: 30,
    paddingBottom: 45,
  },
  backgroundCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: purpler,
  },
  speakerImgOverlay: {
    position: 'absolute',
    bottom: 0,
    marginLeft: -15,
    // marginBottom: -15,
    padding: 15,
    width: width
  },
  speakerImg: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
    backgroundColor: '#f00'
  },
  talkTime: {
    fontFamily: 'nunito-bold',
    color: '#232377',
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#232377'
  },
  talkLocation: {
    fontFamily: 'nunito',
    color: '#232377',
    fontSize: 12,
  },
  talkAffiliation: {
    color: '#fff',
    fontSize: 10,
    opacity: 0.5
  },
  talkTopic: {
    color: purpler,
    fontSize: 12,
  },
  talkTitle: {
    fontSize: 15,
    color: '#161637',
  },
  talkSpeaker: {
    fontSize: 15,
    marginTop: 5,
    color: 'rgba(255,255,255,0.8)'
  }
})

const mapStateToProps = ({ profile, app }) => {
  // const { user } = auth
  // const { img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, myPlaces } = profile
  
  // if ( user !== null ) {
  //   return { profile }
  // }

  return { 
    profile,
    profileTemp: app.profileTemp
  }
}

export default connect(mapStateToProps, { 
  firebaseLogoutUser, profileFieldUpdate, profileSave, profileTemp, profileReset
})(ProfileScreen)