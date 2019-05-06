import React, { Component } from 'react'
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { isIphoneX } from '../../../utils/helpers'
import AppText from '../text/AppText'
import { connect } from 'react-redux'

class ProfileButton extends Component {
  renderButton() {
    const { user, text, name, cancelButton } = this.props
    
    if ( cancelButton ) {
      return <FontAwesomeIcon name={name ? name : 'times'} size={16} style={{color: '#fff'}}/>
    } else if ( user && user.picture !== undefined ) {
      return <Image source={{uri: user.picture.data.url}} style={styles.userImg} />
    } else if ( text ) {
      return <AppText fontFamily={'nunito-black'} style={{color: '#00dddd'}} size={24}>{text}</AppText>
    } else {
      return <Icon name='user' size={16} style={{color: '#fff'}} />
    }
  }

  render() {
    const { user, loggedIn, name, cancelButton } = this.props

    if ( !loggedIn ) {
      return (
        <TouchableOpacity 
          style={[
            styles.profileButton, {
              backgroundColor: 'transparent',
              borderWidth: 0,
            }
          ]}
          onPress={this.props.onPress}
        >
          {cancelButton 
            ? <FontAwesomeIcon name={name ? name : 'times'} size={16} style={{color: '#fff'}}/>
            : <FontAwesomeIcon name={name ? name : 'bars'} size={16} style={{color: '#fff'}}/>
          }
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity 
        style={[
          styles.profileButton, {
            backgroundColor: this.props.text || this.props.cancelButton ? 'transparent' : '#d63aff',
            borderWidth: this.props.text || this.props.cancelButton ? 0 : 1,
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
    top: 0,
    // top: isIphoneX() ? 42 : 7,
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

const mapStateToProps = ({ auth, app }) => {
  const { user } = auth
  return { user, loggedIn: app.loggedIn }
}

export default connect(mapStateToProps)(ProfileButton)