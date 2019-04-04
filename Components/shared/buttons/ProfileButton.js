import React, { Component } from 'react'
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { blue } from '../../../utils/colors'
import { isIphoneX } from '../../../utils/helpers'
import AppText from '../text/AppText'

const ProfileButton = (props) => {
  return (
    <TouchableOpacity 
      style={[
        styles.profileButton, {
          backgroundColor: props.text ? 'transparent' : '#d63aff',
          borderWidth: props.text ? 0 : 1,
        }
      ]}
      onPress={props.onPress}
    >
      {props.image && <Image source={image} />}
      {props.text && <AppText fontFamily={'nunito-black'} style={{color: '#00dddd'}} size={24}>{props.text}</AppText>}
      {!props.image && !props.text && <Icon name='user' size={16} style={{color: '#fff'}} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  profileButton: {
    position: 'absolute',
    right: 10,
    top: isIphoneX() ? 42 : 7,
    width: 30,
    height: 30,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#d63aff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#151537',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  }
})

export default ProfileButton