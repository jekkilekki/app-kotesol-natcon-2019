import React, { Component } from 'react'
import { Text, View, SafeAreaView, Modal, StyleSheet, Dimensions, TouchableOpacity, Switch } from 'react-native'
import { connect } from 'react-redux'
import { profileFieldUpdate } from '../../../actions'

import AppText from '../../shared/text/AppText'
import AppInput from '../../shared/AppInput'
import ContentButton from '../../shared/buttons/ContentButton'
import ProfileButton from '../../shared/buttons/ProfileButton'
import { purpler, appGrey, appGreyLight30, appPurple, appDarkBlue } from '../../../utils/colors';

const { width, height } = Dimensions.get('window')

class ProfileModal extends Component {
  // componentDidMount() {
  //   this.props.profileTemp()
  // }

  render() {
    const { onClose, onSave, visible, profile } = this.props

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
                <AppInput 
                  darkLabel
                  label='First name'
                  placeholder='First name'
                  value={profile.firstName}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'firstName', value })}
                  containerStyle={styles.inputBox}
                  inputStyle={styles.inputText}
                  placeholderTextColor={appGrey}
                />
                <AppInput 
                  darkLabel
                  label='Last name'
                  placeholder='Last name'
                  value={profile.lastName}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'lastName', value })}
                  containerStyle={styles.inputBox}
                  inputStyle={styles.inputText}
                  placeholderTextColor={appGrey}
                />
                <AppInput 
                  darkLabel
                  label='Affiliation'
                  placeholder='School / Company'
                  value={profile.affiliation}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'affiliation', value })}
                  containerStyle={styles.inputBox}
                  inputStyle={styles.inputText}
                  placeholderTextColor={appGrey}
                />
                <AppInput 
                  darkLabel
                  label='Short Bio'
                  placeholder="I'm a teacher at..."
                  value={profile.shortBio}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'shortBio', value })}
                  multiline
                  numberOfLines={8}
                  containerStyle={[styles.inputBox, {height: 140}]}
                  inputStyle={styles.inputText}
                  placeholderTextColor={appGrey}
                />
                <AppInput 
                  darkLabel
                  label='Email'
                  subLabel='(not displayed publicly)'
                  placeholder='me@email.com'
                  value={profile.email}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'email', value })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  containerStyle={styles.inputBox}
                  inputStyle={styles.inputText}
                  placeholderTextColor={appGrey}
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
                  placeholder='secret'
                  value={profile.secretKey}
                  onChangeText={(value) => this.props.profileFieldUpdate({ prop: 'secretKey', value })}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  containerStyle={styles.inputBox}
                  inputStyle={styles.inputText}
                  placeholderTextColor={appGrey}
                />
                <ContentButton
                  title="Save"
                  opaque
                  onPress={onSave}
                  // disabled={profile.firstName === '' || profile.lastName === ''}
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
  }, 
  inputBox: {
    
  },
  inputText: {
    fontSize: 15,
    color: purpler,
    borderColor: appGrey,
    backgroundColor: appGreyLight30,
    minHeight: 33
  }
})

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps, { profileFieldUpdate })(ProfileModal)