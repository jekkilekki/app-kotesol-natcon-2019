import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import { primary, black, white, purple, blueDark } from '../../../utils/colors'

import { isIphoneX } from '../../../utils/helpers'

import AppScreenTitle from '../text/AppScreenTitle'
import AppScreenSubtitle from '../text/AppScreenSubtitle'
import ProfileButton from '../ProfileButton'

class Header extends Component {
  _handleProfile = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View 
        style={[styles.header, {
          backgroundColor: this.props.background || 'transparent',
        }]}>
        <AppScreenTitle>{this.props.pageName}</AppScreenTitle>
        <AppScreenSubtitle>{this.props.pageSub}</AppScreenSubtitle>
        <ProfileButton onPress={this._handleProfile} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: isIphoneX() ? 40 : 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // shadowColor: black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // elevation: 2,
  },
  title: {
    fontFamily: 'futura',
    fontSize: 20
  }
})

export default withNavigation(Header)