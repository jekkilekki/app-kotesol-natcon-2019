import React, { Component } from 'react'
import { Text, View, SafeAreaView, Modal, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'
import { ImagePicker, Permissions } from 'expo'
import { connect } from 'react-redux'
import { profileFieldUpdate } from '../../../actions'
import firebase from 'firebase'

import EntypoIcon from 'react-native-vector-icons/Entypo'

import AppText from '../../shared/text/AppText'
import AppInput from '../../shared/AppInput'
import ContentButton from '../../shared/buttons/ContentButton'
import ProfileButton from '../../shared/buttons/ProfileButton'

const { width, height } = Dimensions.get('window')

class AppModal extends Component {

  checkCameraPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if ( status !== 'granted' ) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      if ( status !== 'granted' )
        Alert.alert(
          'Permissions needed',
          'Grant this app access to the camera and photo library?',
          [
            {text: 'Yes', onPress: () => true},
            {text: 'No', onPress: () => false}
          ],
        )
    }
  }

  checkCameraRollPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if ( status !== 'granted' ) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if ( status !== 'granted' ) 
        Alert.alert(
          'Permissions needed',
          'Grant this app access to the photo library?',
          [
            {text: 'Yes', onPress: () => true},
            {text: 'No', onPress: () => false}
          ],
        )
    }
  }

  uploadImg = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    firebase.storage().ref().child('my-image').put(blob)
  }

  captureImg = async () => {
    this.checkCameraPermissions()
    let result = await ImagePicker.launchCameraAsync()
    if ( !result.cancelled ) {
      this.uploadImg(result.uri)
    }
  }

  selectImg = async () => {
    this.checkCameraRollPermissions()
    let result = await ImagePicker.launchImageLibraryAsync()
    if ( !result.cancelled ) {
      this.uploadImg(result.uri)
    }
  }

  render() {
    const { children, user, visible, onClose, onSave, onLogout, profile } = this.props

    return (
      <Modal
        animationType={'slide'}
        onRequestClose={() => {}}
        onDismiss={onClose}
        transparent
        visible={visible}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ProfileButton onPress={onClose} cancelButton/>
          <View style={styles.modalInterior}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => this.selectImg()}>
                <EntypoIcon name={'images'} size={20} color={'#151537'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.captureImg()}>
                <EntypoIcon name={'camera'} size={20} color={'#151537'} />
              </TouchableOpacity>
            </View>
            <ContentButton
              title="Save"
              onPress={onSave}
              disabled={profile.firstName === '' || profile.lastName === ''}
            />
          </View>
        </SafeAreaView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
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