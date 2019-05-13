import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const ProfileEditButton = (props) => {
  return (
    <TouchableOpacity style={[styles.editMe, props.style]} onPress={props.onPress}>
      <MaterialIcon name='edit' color={props.color ? props.color : 'rgba(255,255,255,0.5)'} size={props.large ? 20 : 12} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  editMe: {
    position: 'absolute',
    bottom: 0,
    right: 0
  }
})

export default ProfileEditButton