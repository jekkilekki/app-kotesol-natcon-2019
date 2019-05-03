import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './store'
import Main from './Components/Main'
import firebase from 'firebase'
import { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId } from './utils/_config'

console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: Hey, listen!']

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
        alert('Logged in!')
        this.setState({ loggedIn: true })
      } else {
        alert('Logged out!')
        this.setState({ loggedIn: false })
      }
    })
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
