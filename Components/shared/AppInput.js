import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import AppText from './text/AppText'
import { blueGray100, purpler } from '../../utils/colors'

const AppInput = ({ 
  label, value, placeholder, onChangeText, secureTextEntry,
  multiline, numberOfLines, autoCorrect, autoCapitalize, styleZ, 
  darkLabel, containerStyle, inputStyle, subLabel, placeholderTextColor
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && 
        <AppText style={[styles.label, {color: darkLabel ? purpler : 'white'}]}>
          {label}
          {subLabel &&
            <AppText note style={[styles.label, {color: darkLabel ? purpler : 'white', opacity: 0.6}]}>
              {` ${subLabel}`}
            </AppText>
          }
        </AppText>
      }
      <TextInput 
        style={[styles.input, {
          minHeight: multiline ? 100 : 40,
          fontSize: multiline ? 15 : 18
        }, inputStyle]} 
        value={value}
        placeholder={placeholder || label}
        placeholderTextColor={placeholderTextColor || 'rgba(255,255,255,0.3)'}
        onChangeText={onChangeText}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'nunito',
    color: '#fff',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    fontSize: 15,
    flex: 1,
    backgroundColor: '#232377',
    borderColor: 'rgba(0,221,221,0.3)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    minHeight: 35
  },
  label: {
    marginBottom: 3,
    // fontSize: 18,
    // position: 'absolute',
    // zIndex: 10,
    // left: 5
  },
  container: {
    minHeight: 60,
    marginBottom: 5
    // flexDirection: 'row',
    // alignItems: 'center'
  }
})

export default AppInput