import React, { Component } from 'react'
import { Text, View, SafeAreaView, Modal, StyleSheet, Dimensions, TouchableOpacity, Switch } from 'react-native'
import { connect } from 'react-redux'
import { profileFieldUpdate, profileSave } from '../../../actions'

import AppText from '../../shared/text/AppText'
import AppInput from '../../shared/AppInput'
import ContentButton from '../../shared/buttons/ContentButton'
import ProfileButton from '../../shared/buttons/ProfileButton'
import { purpler } from '../../../utils/colors';

const { width, height } = Dimensions.get('window')

class ProfileModal extends Component {
  _onSave = () => {
    // Need to save this data to Firebase - to recall it all later
    // const { profile, navigation } = this.props // maybe we don't need to destructure it
    const { profile, navigation } = this.props
    this.props.profileSave( profile )
    this.props.onClose()
    // this.props.navigation.navigate('Home')
  }

  render() {
    const { onClose, visible, profile } = this.props

    return (
      <Modal
        animationType={'slide'}
        onRequestClose={() => {}}
        onDismiss={onClose}
        transparent
        visible={visible}
      >
        <SafeAreaView style={styles.modalBackground}>
          <TouchableOpacity onPressIn={onClose} style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <ProfileButton onPress={onClose} color={purpler} cancelButton/>
              <View style={styles.modalInterior}>
                <AppInput 
                  darkLabel
                  label='First Name'
                  placeholder='Aaron'
                  value={profile.firstName}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'firstName', value })}
                />
                <AppInput 
                  darkLabel
                  label='Last Name'
                  placeholder='Snowberger'
                  value={profile.lastName}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'lastName', value })}
                />
                <AppInput 
                  darkLabel
                  label='Affiliation'
                  placeholder='Jeonju University'
                  value={profile.affiliation}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'affiliation', value })}
                />
                <AppInput 
                  darkLabel
                  label='Short Bio'
                  placeholder="I'm a teacher at..."
                  value={profile.shortBio}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'shortBio', value })}
                  multiline
                  numberOfLines={6}
                  containerStyle={{height: 100, marginBottom: 25}}
                />
                <AppInput 
                  darkLabel
                  label='Email'
                  subLabel='(not displayed publicly)'
                  placeholder='john@doe.com'
                  value={profile.email}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'email', value })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                />
                <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                  <Switch 
                    value={profile.displayInfo}
                    trackColor={{true: '#00dddd'}}
                    style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                    onValueChange={() => this.props.profileFieldUpdate({ prop: 'displayInfo', value: !profile.displayInfo })}
                  />
                  <AppText dark note style={{marginTop: 5}}>Include my info in Attendees List</AppText>
                </View>
                <AppInput
                    darkLabel
                    label='KOTESOL key'
                    subLabel='(required to display info)'
                    placeholder='Found online'
                    value={profile.secretKey}
                    onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'secretKey', value })}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                  />
                <ContentButton
                  title="Save"
                  opaque
                  onPress={this._onSave}
                  disabled={profile.firstName === '' || profile.lastName === ''}
                  style={{marginTop: 20}}
                />
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(25,25,51,0.3)',
    // flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    justifyContent: 'center',
    padding: 15
    // height: height / 2,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15
  },
  modalInterior: {
    flexDirection: 'column',
  }
})

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps, { profileFieldUpdate, profileSave })(ProfileModal)