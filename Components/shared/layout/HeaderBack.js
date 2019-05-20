import React, { Component } from 'react'
import { Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { withNavigation, HeaderBackButton } from 'react-navigation'
import { primary, black, white, purple, blueDark, purpler } from '../../../utils/colors'

import { isIphoneX } from '../../../utils/helpers'

import AppScreenTitle from '../text/AppScreenTitle'
import AppScreenSubtitle from '../text/AppScreenSubtitle'
import ProfileButton from '../buttons/ProfileButton'
import AppText from '../text/AppText';

class HeaderBack extends Component {
  _handleCancel = () => {
    this.props.navigation.navigate('Home')
  }

  _handleProfile = () => {
    this.props.navigation.navigate('Auth')
  }

  _goBack = () => {
    // this.props.toHome 
    //   ? this.props.navigation.navigate('Home')
    //   : this.props.navigation.goBack()
    if ( this.props.backPage ) {
      this.props.navigation.goBack() || this.props.navigation.navigate(this.props.backPage)
    } else {
      this.props.navigation.goBack() || this.props.navigation.navigate('Home')
    }
  }

  render() {
    return (
      <SafeAreaView 
        style={[styles.header, {
          backgroundColor: this.props.background || purpler,
        }]}>
        <HeaderBackButton tintColor={'#00dddd'} onPress={() => this._goBack()} />
        <TouchableOpacity onPress={() => this._goBack()} >
          <AppText style={styles.headerText}>Back</AppText>
        </TouchableOpacity>
        {/* <AppScreenTitle small>{this.props.pageName}</AppScreenTitle>
        <AppScreenSubtitle>{this.props.pageSub}</AppScreenSubtitle> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    zIndex: 100,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // paddingBottom: 10,
    // paddingLeft: 15,
    // paddingRight: 15,
    // shadowColor: black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // elevation: 2,
  },
  headerText: {
    marginTop: Platform.OS === 'ios' ? 12 : 17
  }
})

export default withNavigation(HeaderBack)