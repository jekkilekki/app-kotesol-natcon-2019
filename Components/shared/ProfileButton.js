import React, { Component } from 'react'
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { blue } from '../../utils/colors'
import { isIphoneX } from '../../utils/helpers'

const ProfileButton = (props) => {
  return (
    <TouchableOpacity 
      style={styles.profileButton}
      onPress={props.onPress}
    >
      {props.image 
        ? <Image source={image} />
        : <Icon name='user' size={16} />
      }
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
    backgroundColor: '#00dddd',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProfileButton