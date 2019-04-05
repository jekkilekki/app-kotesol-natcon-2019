import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import AppText from './text/AppText'
import { blueGray100 } from '../../utils/colors';

const AppInput = ({ label, value, placeholder, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <TextInput 
        style={styles.input} 
        value={value}
        placeholder={placeholder || label}
        onChangeText={onChangeText}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'nunito',
    color: '#fff',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
    flex: 3,
    backgroundColor: '#232377',
    borderColor: 'rgba(0,221,221,0.3)',
    borderWidth: 1,
    borderRadius: 5
  },
  label: {
    fontSize: 18,
    marginRight: 20,
    flex: 1
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default AppInput