import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Loader from '../shared/Loader'
import AppHeader from '../shared/layout/AppHeader'
import LoginForm from '../views/user/LoginForm'
import AppScreen from '../shared/layout/AppScreen';
import MyButton from '../shared/MyButton';

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Register or Login'
  }

  componentDidMount() {
    // this.props.fbLogin()
    // Delete the token that lets us know we're logged in (remove after testing)
    // AsyncStorage.removeItem('fb_token')
    this.onAuthComplete(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps)
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Schedule')
    }
  }

  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='Login'
          pageSub='Unlock the hidden features'
        />
        <View style={styles.container}>
          <LoginForm />
          <MyButton onPress={() => this.props.fbLogin()}/>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

function mapStateToProps({ auth }) {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen)