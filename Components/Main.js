import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { Provider } from 'react-redux'
import { Font, AnimatedRegion } from 'expo'
import { Icon } from 'native-base'

import store from './store'
import middleware from './middleware'
import reducer from './reducers'
// import Main from './Components/Main'
// import { Navigation } from './Components/shared/Navigation'
import { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId } from './utils/_config'
import firebase from 'firebase'

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   // composeWithDevTools( middleware ) // Windows 
//   // middleware
// )

const showIntro = false;

class App extends Component {
  state = {
    fontLoaded: false,
    loggedIn: null
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey,
      authDomain,
      databaseURL,
      storageBucket,
      messagingSenderId
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  async componentDidMount() {
    await Font.loadAsync({
      'nunito': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
      'nunito-bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
      'nunito-black': require('./assets/fonts/Nunito/Nunito-Black.ttf'),
      'futura': require('./assets/fonts/Futura/Futura-Condensed-Medium.otf'),
      'futura-bold': require('./assets/fonts/Futura/Futura-Condensed-Bold.otf')
    })
    this.setState({ fontLoaded: true })

    let token = await AsyncStorage.getItem('fb_token')
    if (token) this.setState({ loggedIn: true })
  }

  render() {
    return (
      <Provider store={store}>
        { this.state.fontLoaded &&
          <AppContainer loggedIn={this.state.loggedIn} />
        }
      </Provider>
    )
  }
}

export default App
