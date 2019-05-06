import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
// import { connect } from 'react-redux'
// import { inputEmail, inputPassword, firebaseLoginUser } from '../../../actions'
 
import AppInput from '../../shared/AppInput'
import AppText from '../../shared/text/AppText'
import ContentButton from '../../shared/buttons/ContentButton'
import Loader from '../../shared/Loader'

class LoginRedux extends Component {
  componentDidMount() {
    if ( this.props.loggedIn ) {
      this.props._onLoggedIn()
    }
  }

  _onEmailInput = (text) => {
    this.props._onEmailInput(text)
  }

  _onPasswordInput = (text) => {
    this.props._onPasswordInput(text)
  }

  _onLogin = () => {
    // const { email, password, error } = this.props
    // this.props.firebaseLoginUser({ email, password })
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
        // onPress={this._onLogin}
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

// const mapStateToProps = ({ auth }) => {
//   const { email, password, error, loading, user } = auth
//   return { email, password, error, loading, user }
// }

// export default connect(mapStateToProps, {
//   inputEmail, inputPassword, firebaseLoginUser
// })(LoginRedux)

export default LoginRedux