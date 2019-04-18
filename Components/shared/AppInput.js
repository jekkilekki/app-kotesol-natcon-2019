import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import AppText from './text/AppText'
import { blueGray100 } from '../../utils/colors'

const AppInput = ({ 
  label, value, placeholder, onChangeText, secureTextEntry,
  multiline, numberOfLines, autoCorrect, autoCapitalize, styleZ
}) => {
  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <TextInput 
        style={[styles.input, {
          height: multiline ? 100 : 40,
          fontSize: multiline ? 15 : 18
        }]} 
        value={value}
        placeholder={placeholder || label}
        placeholderTextColor={'rgba(255,255,255,0.3)'}
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
    fontSize: 18,
    flex: 1,
    backgroundColor: '#232377',
    borderColor: 'rgba(0,221,221,0.3)',
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    marginBottom: 3,
    // fontSize: 18,
    // position: 'absolute',
    // zIndex: 10,
    // left: 5
  },
  container: {
    // height: 60,
    // flexDirection: 'row',
    // alignItems: 'center'
  }
})

export default AppInput