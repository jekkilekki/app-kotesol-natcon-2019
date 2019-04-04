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
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    lineHeight: 24,
    flex: 3,
    borderColor: blueGray100,
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