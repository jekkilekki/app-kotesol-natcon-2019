import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'

import store from './store'
import Main from './Components/Main'
import firebase from 'firebase'
import { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId } from './utils/_config'

console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: useNativeDriver']

class App extends Component {
  state = {
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

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     'nunito': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
  //     'nunito-bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
  //     'nunito-black': require('./assets/fonts/Nunito/Nunito-Black.ttf'),
  //     'futura': require('./assets/fonts/Futura/Futura-Condensed-Medium.otf'),
  //     'futura-bold': require('./assets/fonts/Futura/Futura-Condensed-Bold.otf')
  //   })
  //   this.setState({ fontLoaded: true })

  //   let token = await AsyncStorage.getItem('knc_token')
  //   if (token) this.setState({ loggedIn: true })
  // }

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App
