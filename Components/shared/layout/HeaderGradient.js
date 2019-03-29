import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { primary, black, white, purple, purpleDarkest, blue, blueDark } from '../../../utils/colors'
import { LinearGradient } from 'expo'
import ProfileButton from '../ProfileButton'

class HeaderGradient extends Component {
  state = {
    background: blueDark,
    color: white
  }

  _handleProfile = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <LinearGradient 
        colors={[
          this.props.color1 || blue, 
          this.props.color2 || purple
        ]}
        style={styles.header}
        start={{x: 0.0, y: 0.25}} 
        end={{x: 0.75, y: 1}}
        locations={[0,1]}
      >
        <Text style={[styles.title, { color: this.props.color || this.state.color }]}>{this.props.pageName}</Text>
        <ProfileButton onPress={this._handleProfile} />
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
  },
  title: {
    fontFamily: 'futura',
    fontSize: 20
  }
})

export default withNavigation(HeaderGradient)