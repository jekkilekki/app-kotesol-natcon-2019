import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { Provider } from 'react-redux'
import { Font } from 'expo'
import { Icon } from 'native-base'

import store from './store'
import middleware from './middleware'
import reducer from './reducers'
// import Main from './Components/Main'
// import { Navigation } from './Components/shared/Navigation'
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator, createMaterialBottomTabNavigator, createDrawerNavigator, createTabNavigator } from 'react-navigation'
import { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId } from './utils/_config'
import firebase from 'firebase'


import WelcomeScreen from './Components/screens/WelcomeScreen';
import AuthScreen from './Components/screens/AuthScreen';
import ScheduleScreen from './Components/screens/ScheduleScreen';
import SpeakersScreen from './Components/screens/SpeakersScreen';
import MapScreen from './Components/screens/MapScreen';
import AboutScreen from './Components/screens/AboutScreen';

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   // composeWithDevTools( middleware ) // Windows 
//   // middleware
// )

const showIntro = false;

class App extends Component {
  state = {
    fontLoaded: false
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey,
      authDomain,
      databaseURL,
      storageBucket,
      messagingSenderId
    })
  }

  async componentDidMount() {
    await Font.loadAsync({
      'nunito': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
      'futura': require('./assets/fonts/Futura/Futura-Condensed-Medium.otf')
    })
    this.setState({ fontLoaded: true })
  }

  render() {
    return (
      <Provider store={store}>
        { this.state.fontLoaded &&
          <AppContainer />
        }
      </Provider>
    )
  }
}

const iosNavigation = createBottomTabNavigator({
  Schedule: {
    screen: ScheduleScreen,
    navigationOptions: {
      tabBarLabel: 'Schedule',
      tabBarIcon: ({ focused, tintColor }) => 
        <Icon name='clock' />
    },
  },
  Speakers: {
    screen: SpeakersScreen,
    navigationOptions: {
      tabBarLabel: 'Speakers',
      tabBarIcon: ({ focused, tintColor }) => 
        <Icon name='mic' />
    },
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'Venue',
      tabBarIcon: ({ focused, tintColor }) => 
        <Icon name='locate' />
    },
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: ({ focused, tintColor }) => 
        <Icon name='information-circle' />
    },
  },
})

// const androidNavigation = createMaterialBottomTabNavigator({
//   Schedule: ScheduleScreen,
//   Speakers: SpeakersScreen,
//   Map: MapScreen,
//   About: AboutScreen
// })

const drawerNavigation = createDrawerNavigator({
  Welcome: WelcomeScreen,
  Auth: AuthScreen,
  Schedule: ScheduleScreen,
  Speakers: SpeakersScreen,
  Map: MapScreen,
  About: AboutScreen
})

const RootNavigation = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Auth: AuthScreen,
  Home: iosNavigation
}, {
  initialRouteName: showIntro ? 'Welcome' : 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#151537',
      color: '#ffffff'
    }
  }
})

const AppContainer = createAppContainer(RootNavigation)

export default App
