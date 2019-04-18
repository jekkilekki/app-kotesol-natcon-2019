import React from 'react' 
import { View, TextInput, StyleSheet } from 'react-native'

import AppInput from '../AppInput'
import { purpler } from '../../../utils/colors'

const AppSearch = (props) => {
  return (
    <View style={styles.searchStyle}>
      <TextInput 
        placeholder={'Search'}
        placeholderTextColor={'rgba(255,255,255,0.3)'}
        style={styles.searchInput}
        onChangeText={props.onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchStyle: {
    height: 50,
    backgroundColor: purpler,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  searchInput: {
    fontFamily: 'nunito',
    color: '#fff',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    fontSize: 18,
    backgroundColor: '#232377',
    borderColor: 'rgba(0,221,221,0.3)',
    borderWidth: 1,
    borderRadius: 5,
    height: 35
  }
})

export default AppSearch