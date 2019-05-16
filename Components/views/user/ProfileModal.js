import React, { Component } from 'react'
import { Text, View, SafeAreaView, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { profileFieldUpdate, profileSave } from '../../../actions'

import AppText from '../../shared/text/AppText'
import AppInput from '../../shared/AppInput'
import ContentButton from '../../shared/buttons/ContentButton'
import ProfileButton from '../../shared/buttons/ProfileButton'

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
              <ProfileButton onPress={onClose} color={'#232377'} cancelButton/>
              <View style={styles.modalInterior}>
                <AppInput 
                  label='First Name'
                  placeholder='Aaron'
                  value={profile.firstName}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'firstName', value })}
                />
                <AppInput 
                  label='Last Name'
                  placeholder='Snowberger'
                  value={profile.lastName}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'lastName', value })}
                />
                <AppInput 
                  label='Affiliation'
                  placeholder='Jeonju University'
                  value={profile.affiliation}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'affiliation', value })}
                />
                <AppInput 
                  label='Short Bio'
                  placeholder="I'm a teacher at..."
                  value={profile.shortBio}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'shortBio', value })}
                  multiline
                  numberOfLines={6}
                />
                <AppInput 
                  label='Email'
                  placeholder='john@doe.com'
                  value={profile.email}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'email', value })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                />
                <ContentButton
                  title="Save"
                  onPress={this._onSave}
                  disabled={profile.firstName === '' || profile.lastName === ''}
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
    // margin: 15,
  }
})

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps, { profileFieldUpdate, profileSave })(ProfileModal)