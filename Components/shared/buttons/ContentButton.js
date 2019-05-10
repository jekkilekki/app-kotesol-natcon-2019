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
          { backgroundColor: props.opaque && !props.disabled ? '#00dddd' : 'rgba(0,221,221,0.3)',
            paddingTop: props.small ? 2 : 10,
            paddingBottom: props.small ? 2 : 10,
            paddingLeft: props.small ? 10 : 10,
            paddingRight: props.small ? 10 : 10,
            marginTop: props.small ? 10 : 0,
            marginBottom: props.small ? -10 : 0,
          },
          props.style
        ]}
      >
        {props.title 
        ? <AppText 
            style={[styles.buttonText,
              { color: props.opaque ? '#fff' : '#00dddd',
                fontSize: props.small ? 11 : 12
              }
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
    borderRadius: 15
  },
  buttonText: {
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})

export default ContentButton