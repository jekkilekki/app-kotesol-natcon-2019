import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import AppInput from '../../shared/AppInput'
import AppText from '../../shared/text/AppText'
import ContentButton from '../../shared/buttons/ContentButton'

class LoginRedux extends Component {
  state = {
    email: '',
    password: ''
  }

  _onInput(text) {

  }

  renderButton() {
    if (this.state.loading) {
      return <Loader />
    }

    return (
      <ContentButton 
        title='Login' 
        opaque
        // onPress={this._handleSubmit}
        onPress={this._onLogin}
      />
    )
  }

  render() {
    return (
      <View>
        <AppText style={styles.error}>{this.state.error}</AppText>
        <AppInput 
          label='Email'
          placeholder='user@email.com'
          value={this.state.email}
          onChangeText={email => this._onInput(email)}
        />
        <AppInput 
          label='Password'
          placeholder='password'
          value={this.state.password}
          onChangeText={password => this._onInput(password)}
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
    fontSize: 20
  }
})

export default LoginRedux