import React, { Component } from 'react'
import { Text, View, SafeAreaView, Modal, StyleSheet, Dimensions, TouchableOpacity, Alert, Image } from 'react-native'
import { ImagePicker, Permissions } from 'expo'
import { connect } from 'react-redux'
import { profileFieldUpdate } from '../../../actions'
import { generateImgID } from '../../../utils/helpers'
import * as firebase from 'firebase'

import EntypoIcon from 'react-native-vector-icons/Entypo'

import AppText from '../../shared/text/AppText'
import AppInput from '../../shared/AppInput'
import ContentButton from '../../shared/buttons/ContentButton'
import ProfileButton from '../../shared/buttons/ProfileButton'
import { purpler, appGrey30, appGreyLight30, appGrey } from '../../../utils/colors';

const { width, height } = Dimensions.get('window')

class AppModal extends Component {
  state = {
    img: this.props.profile.img || 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png' 
  }
  // componentDidMount() {
  //   this.props.profileTemp()
  // }

  componentWillReceiveProps(nextProps) {
    if ( this.props.profile.img !== nextProps.profile.img ) {
      this.setState({ img: nextProps.profile.img })
    }
  }

  checkCameraPermissions = async () => {
    // const { status } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    // if ( status !== 'granted' ) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      if ( status !== 'granted' ) {
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
    // const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    // if ( status !== 'granted' ) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if ( status !== 'granted' ) {
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

  captureImg = async () => {
    this.checkCameraPermissions()
    let result = await ImagePicker.launchCameraAsync({
      quality: 0,
      height: '200px',
      width: '200px',
      base64: true
    })
    if ( !result.cancelled ) {
      this.uploadImg(result.uri, generateImgID())
        .then((res, rej) => {
          console.log('Image upload SUCCESS! Better check~')
          console.log('res', res)
          console.log('rej', rej)

          const imgPath = res
          this.props.profileFieldUpdate({ prop: 'img', value: imgPath })
          this.setState({ img: imgPath })
        })
        .catch((e) => {
          console.log('Failure', e)
        })
    }
  }

  selectImg = async () => {
    // Check our permissions
    this.checkCameraRollPermissions()
    // Get the image
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [1, 1],
      quality: 0,
      height: '200px',
      width: '200px',
      base64: true
    })
    // If not cancelled, upload
    if ( !result.cancelled ) {
      console.log('image result', result)
      this.uploadImg(result.uri, generateImgID())
        .then((res, rej) => {
          console.log('Image upload SUCCESS! Better check~')
          console.log('res', res)
          console.log('rej', rej)

          const imgPath = res
          this.props.profileFieldUpdate({ prop: 'img', value: imgPath })
          this.setState({ img: imgPath })
        })
        .catch((e) => {
          console.log('Failure', e)
        })
    }
  }


  // This should help:
  // https://snack.expo.io/@bacon/image-upload-firebase-base64
  uploadImg = async (uri, imageName) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    var ref = firebase.storage().ref().child('images/' + imageName)
    const snapshot = await ref.put(blob)
    blob.close()
    return await snapshot.ref.getDownloadURL()
  }

  render() {
    const { children, user, visible, onClose, onSave, onLogout, profile } = this.props

    return (
      <Modal
        animationType={'slide'}
        onRequestClose={() => {}}
        // onDismiss={onClose}
        transparent
        visible={visible}
      >
        <SafeAreaView style={styles.modalBackground}>
          <TouchableOpacity onPressIn={onClose} style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <ProfileButton onPress={onClose} color={purpler} cancelButton/>
              <View style={styles.modalInterior}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 30}}>
                  <TouchableOpacity onPress={() => this.selectImg()} style={styles.button}>
                    <EntypoIcon name={'images'} size={20} color={'#151537'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.selectImg()}>
                    <Image 
                      source={{uri: this.state.img, cache: 'reload'}} style={styles.userImg}
                      key={this.state.img}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.captureImg()} style={styles.button}>
                    <EntypoIcon name={'camera'} size={20} color={'#151537'} />
                  </TouchableOpacity>
                </View>
                <AppInput
                  darkLabel
                  label='Image URI'
                  subLabel='(optional)'
                  placeholder='https://www...jpg'
                  value={profile.img}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'img', value })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  containerStyle={styles.inputBox}
                  inputStyle={styles.inputText}
                  placeholderTextColor={appGrey}
                />
                <ContentButton
                  opaque
                  title="Save"
                  onPress={onSave}
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
  },
  button: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: appGrey30,
    marginLeft: 5,
    marginRight: 5,
    borderRightColor: appGrey,
    borderBottomColor: appGrey,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputBox: {
    
  },
  inputText: {
    fontSize: 15,
    color: purpler,
    borderColor: appGrey,
    backgroundColor: appGreyLight30,
    minHeight: 33
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
    borderRadius: 75,
    borderColor: appGreyLight30,
    borderWidth: 1
  },
})

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps, { profileFieldUpdate })(AppModal)