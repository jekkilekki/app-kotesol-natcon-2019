import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { primary, black, white, purple, purpler, blueDark } from '../../../utils/colors'

import { isIphoneX } from '../../../utils/helpers'

import AppScreenTitle from '../text/AppScreenTitle'
import AppScreenSubtitle from '../text/AppScreenSubtitle'
import ProfileButton from '../buttons/ProfileButton'
import AppText from '../text/AppText'

class Header extends Component {
  _handleCancel = () => {
    this.props.navigation.navigate('Home')
  }

  _handleProfile = () => {
    this.props.navigation.navigate('Auth')
  }

  _findDimensions(layout) {
    const { x, y, width, height } = layout
    // console.warn(height)
  }

  renderProfileButton() {
    if ( this.props.pageName !== 'Login' && this.props.pageName !== 'Profile' ) {
      return <ProfileButton onPress={this._handleProfile} />
    } else if ( this.props.pageName === 'Login' ) { 
      return <ProfileButton onPress={this._handleCancel} text={'X'} />
    }
  }

  render() {
    return (
      <View 
        onLayout={(event) => { this._findDimensions(event.nativeEvent.layout) }}
        style={[styles.header, 
          { shadowColor: this.props.noShadow ? 'transparent' : black, },
          this.props.style,
        ]}
      >
        {this.renderProfileButton()}
        <AppScreenTitle>{this.props.pageName}</AppScreenTitle>
        <AppScreenSubtitle>{this.props.pageSub}</AppScreenSubtitle>
        {this.props.children &&
          <View style={{flex: 1}}>
            {this.props.children}
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: isIphoneX() ? 50 : 20,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: purpler,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
})

export default withNavigation(Header)