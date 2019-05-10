import React from 'react'
import { Text, View, SafeAreaView, Modal, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { profileFieldUpdate } from '../../../actions'

import AppText from '../text/AppText'
import AppInput from '../AppInput'
import ContentButton from '../buttons/ContentButton'
import ProfileButton from '../buttons/ProfileButton'

const { width, height } = Dimensions.get('window')

const AppModal = ({ children, user, visible, onClose, onSave, onLogout, profile }) => {
  return (
    <Modal
      animationType={'slide'}
      onRequestClose={() => {}}
      transparent
      visible={visible}
    >
      <SafeAreaView style={styles.modalContainer}>
        <ProfileButton onPress={onClose} cancelButton/>
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
            onPress={onSave}
            disabled={profile.firstName === '' || profile.lastName === ''}
          />
          <ContentButton
            title="Logout"
            onPress={onLogout}
          />
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(35,35,119,0.8)',
    // flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    height: height / 2,
  },
  modalInterior: {
    margin: 15
  }
})

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps, { profileFieldUpdate })(AppModal)