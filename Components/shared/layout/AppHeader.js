import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { primary, black, white, purple, purpler, blueDark } from '../../../utils/colors'

import { isIphoneX } from '../../../utils/helpers'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import AppScreenTitle from '../text/AppScreenTitle'
import AppScreenSubtitle from '../text/AppScreenSubtitle'
import ProfileButton from '../buttons/ProfileButton'
import AppText from '../text/AppText'
import ContentButton from '../buttons/ContentButton';

class Header extends Component {
  _handleCancel = () => {
    this.props.navigation.navigate('Home')
  }

  _handleProfile = () => {
    // this.props.navigation.navigate('Auth')
    this.props.navigation.openDrawer()
  }

  _findDimensions(layout) {
    const { x, y, width, height } = layout
    // console.warn(height)
  }

  renderProfileButton() {
    if ( this.props.pageName === 'Login' || this.props.pageName === 'Profile' ) { 
      return <ProfileButton onPress={this._handleCancel} cancelButton />
    }
    return <ProfileButton onPress={this._handleProfile} />
  }

  render() {
    const { loggedIn, pageBackButton, pageChild, pageName, pageSub, navigation } = this.props

    return (
      <SafeAreaView style={{backgroundColor: this.props.transparent ? 'transparent' : purpler, marginBottom: 0}}>
        <View
          // onLayout={(event) => { this._findDimensions(event.nativeEvent.layout) }}
          style={[styles.header, 
            { shadowColor: this.props.noShadow ? 'transparent' : black, },
            this.props.style,
          ]}
        >
          {this.renderProfileButton()}
          <View style={{flexDirection: 'row'}}>
            {loggedIn && pageBackButton &&
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <EntypoIcon name={'chevron-left'} size={30} color={'#00dddd'} />
              </TouchableOpacity>
            }
            <AppScreenTitle>{pageName}</AppScreenTitle>
            {loggedIn && pageChild &&
              <ContentButton
                small
                title={pageChild}
                onPress={() => navigation.navigate(pageChild.replace(/\s/g,''))}
              />
            }
          </View>
          <AppScreenSubtitle>{pageSub}</AppScreenSubtitle>
          {this.props.children &&
            <View style={{flex: 1}}>
              {this.props.children}
            </View>
          }
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 0,
    backgroundColor: purpler,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    zIndex: 10
  },
  pageChildButton: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 6,
    paddingLeft: 6,
    margin: -5
  }
})

const mapStateToProps = ({ app }) => {
  return {
    loggedIn: app.loggedIn
  }
}

export default withNavigation(connect( mapStateToProps )(Header))