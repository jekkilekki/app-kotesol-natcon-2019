import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { primary, black, white, purple, blueDark } from '../../utils/colors';

class Header extends Component {
  state = {
    background: blueDark,
    color: white
  }

  render() {
    return (
      <View 
        style={[styles.header, {
          backgroundColor: this.props.background || this.state.background,
        }]}>
        <Text style={[styles.title, { color: this.props.color || this.state.color }]}>{this.props.pageName}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  title: {
    fontFamily: 'futura',
    fontSize: 20
  }
})

export default Header