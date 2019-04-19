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

  async componentDidMount() {
    let token = await AsyncStorage.getItem('knc_token')
    if (token) {
      alert(token)
      this.setState({ loggedIn: true })
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Main loggedIn={this.state.loggedIn} />
      </Provider>
    )
  }
}

export default App
