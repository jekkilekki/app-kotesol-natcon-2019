import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { withNavigation, HeaderBackButton } from 'react-navigation'
import { primary, black, white, purple, blueDark } from '../../../utils/colors'

import { isIphoneX } from '../../../utils/helpers'

import AppScreenTitle from '../text/AppScreenTitle'
import AppScreenSubtitle from '../text/AppScreenSubtitle'
import ProfileButton from '../ProfileButton'
import AppText from '../text/AppText';

class HeaderBack extends Component {
  _handleCancel = () => {
    this.props.navigation.navigate('Home')
  }

  _handleProfile = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View 
        style={[styles.header, {
          backgroundColor: this.props.background || 'transparent',
        }]}>
        <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
        <AppScreenTitle small>{this.props.pageName}</AppScreenTitle>
        <AppScreenSubtitle>{this.props.pageSub}</AppScreenSubtitle>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: isIphoneX() ? 70 : 40,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    // shadowColor: black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // elevation: 2,
  },
})

export default withNavigation(HeaderBack)