import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons/AntDesign'

import AppText from '../text/AppText'

const ContentButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.contentButton}>
        <AppText style={styles.buttonText}>
          {props.title ? props.title : props.children}
        </AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contentButton: {
    backgroundColor: 'rgba(0,221,221,0.3)',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 12,
    color: '#00dddd',
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})

export default ContentButton