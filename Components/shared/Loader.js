import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { blueDark } from '../../utils/colors'

const Loader = ({ size }) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={ size || 'large' } color={blueDark} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loader