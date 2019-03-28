import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const ProfileButton = () => {
  return (
    <View style={styles.profileButton}>
      {/* <Image source={} /> */}
      <Icon name='user' size={16} />
    </View>
  )
}

const styles = StyleSheet.create({
  profileButton: {
    position: 'absolute',
    right: 10,
    top: 7,
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