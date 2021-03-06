import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons/AntDesign'

import AppText from '../text/AppText'
import { appGrey, appTeal70 } from '../../../utils/colors';

const ContentButton = (props) => {
  return (
    <View>
    <TouchableOpacity 
      onPress={props.onPress}
      onPressIn={props.onPressIn}
      disabled={props.disabled} 
      delayPressIn={0} 
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
              { color: props.opaque ? '#fff' : props.color ? props.color : '#00dddd',
                fontSize: props.small ? 11 : 12
              }
            ]}
          >{props.title}</AppText>
        : props.children
        }
      </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  contentButton: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    borderRightColor: appTeal70,
    borderBottomColor: appTeal70,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  buttonText: {
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})

export default ContentButton