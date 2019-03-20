import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { primary, black } from '../../utils/colors';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{this.props.pageName}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  title: {
    fontSize: 20
  }
})

export default Header