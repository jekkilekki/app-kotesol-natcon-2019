import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
// import { appReady, loadUser, loginUser } from './actions'

import store from './store'
import Main from './Components/Main'
import firebase from 'firebase'
import { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId } from './utils/_config'

console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: Hey, listen!']

class App extends Component {
  state = {
    user: null
  }

  componentWillMount() {
    // firebase.initializeApp({
    //   apiKey,
    //   authDomain,
    //   databaseURL,
    //   storageBucket,
    //   messagingSenderId
    // })

    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({ user: user })
    //   } else {
    //     this.setState({ user: null })
    //   }
    // })
  }

  render() {
    return (
      <Provider store={store}>
        <Main user={this.state.user} />
      </Provider>
    )
  }
}

export default App
