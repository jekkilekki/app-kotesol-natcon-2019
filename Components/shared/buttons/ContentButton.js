import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons/AntDesign'

import AppText from '../text/AppText'

const ContentButton = (props) => {
  return (
    <TouchableOpacity 
      onPress={props.onPress}
      disabled={props.disabled}  
    >
      <View 
        style={[styles.contentButton,
          { backgroundColor: props.opaque && !props.disabled ? '#00dddd' : 'rgba(0,221,221,0.3)',},
          props.style
        ]}
      >
        {props.title 
        ? <AppText 
            style={[styles.buttonText,
              { color: props.opaque ? '#fff' : '#00dddd' },
              props.style
            ]}
          >{props.title}</AppText>
        : props.children
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contentButton: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})

export default ContentButton