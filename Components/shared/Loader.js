import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { blueDark, purple } from '../../utils/colors'

const Loader = ({ size }) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={ size || 'large' } color={purple} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  }
})

export default Loader