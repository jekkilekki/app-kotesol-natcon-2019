import React, { Component, Fragment } from 'react'
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { blue } from '../../../utils/colors'
import { isIphoneX } from '../../../utils/helpers'
import AppText from '../text/AppText'
import { connect } from 'react-redux'

class ProfileButton extends Component {
  renderButton() {
    const { user, text } = this.props

    if ( user && user.picture !== undefined ) {
      return <Image source={{uri: user.picture.data.url}} style={styles.userImg} />
    } else if ( text ) {
      return <AppText fontFamily={'nunito-black'} style={{color: '#00dddd'}} size={24}>{text}</AppText>
    } else {
      return <Icon name='user' size={16} style={{color: '#fff'}} />
    }
  }

  render() {
    const { user } = this.props

    return (
      <TouchableOpacity 
        style={[
          styles.profileButton, {
            backgroundColor: this.props.text ? 'transparent' : '#d63aff',
            borderWidth: this.props.text ? 0 : 1,
          }
        ]}
        onPress={this.props.onPress}
      >
        {this.renderButton()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  profileButton: {
    position: 'absolute',
    right: 10,
    top: isIphoneX() ? 42 : 7,
    width: 30,
    height: 30,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#d63aff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#151537',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    zIndex: 10
  }
})

const mapStateToProps = ({ auth }) => {
  const { user } = auth
  return { user }
}

export default connect(mapStateToProps)(ProfileButton)