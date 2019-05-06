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
    firebase.initializeApp({
      apiKey,
      authDomain,
      databaseURL,
      storageBucket,
      messagingSenderId
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        alert('App Logged in!')
        console.log('App Logged in!~', user)
        // this.props.loginUser(user)
        this.setState({ user: user })
      } else {
        alert('App Logged out!')
        // this.props.loginUser(null)
        this.setState({ user: null })
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Main user={this.state.user} />
      </Provider>
    )
  }
}

// const mapStateToProps = ({ app }) => {
//   return { assetsLoaded: app.assetsLoaded }
// }

// export default connect(mapStateToProps, { appReady, loadUser, loginUser })(App)

export default App
