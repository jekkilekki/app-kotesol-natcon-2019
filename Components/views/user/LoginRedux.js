import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
 
import AppInput from '../../shared/AppInput'
import AppText from '../../shared/text/AppText'
import ContentButton from '../../shared/buttons/ContentButton'
import Loader from '../../shared/Loader'

class LoginRedux extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && nextProps.user !== null) {
      this.props._onLoginSuccess()
    }
  }

  _onEmailInput = (text) => {
    this.props._onEmailInput(text)
  }

  _onPasswordInput = (text) => {
    this.props._onPasswordInput(text)
  }

  _onLogin = () => {
    this.props._onLogin()
  }

  renderButton() {
    if (this.props.loading) {
      return <Loader />
    }

    return (
      <ContentButton 
        title='Login' 
        opaque
        onPress={this._onLogin}
        disabled={this.props.email === '' && this.props.password === ''}
      />
    )
  }

  render() {
    return (
      <View style={this.props.style}>
        <AppText style={styles.error}>{this.props.error}</AppText>
        <AppInput 
          label='Email'
          placeholder='user@email.com'
          value={this.props.email}
          onChangeText={this._onEmailInput}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
        <AppInput 
          label='Password'
          placeholder='password'
          value={this.props.password}
          onChangeText={this._onPasswordInput}
          secureTextEntry
        />
        {this.renderButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 15, 
    marginBottom: 5
  }
})

const mapStateToProps = ({ app }) => {
  const { profileLoaded } = app
  return { profileLoaded }
}

export default connect(mapStateToProps)(LoginRedux)