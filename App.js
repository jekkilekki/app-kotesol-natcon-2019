import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { Provider } from 'react-redux'

import middleware from './middleware'
import reducer from './reducers'
// import Main from './Components/Main'
// import { Navigation } from './Components/shared/Navigation'
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import WelcomeScreen from './Components/screens/WelcomeScreen';
import AuthScreen from './Components/screens/AuthScreen';
import ScheduleScreen from './Components/screens/ScheduleScreen';
import SpeakersScreen from './Components/screens/SpeakersScreen';
import MapScreen from './Components/screens/MapScreen';
import AboutScreen from './Components/screens/AboutScreen';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // composeWithDevTools( middleware ) // Windows 
  middleware
)

const showIntro = true;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

const iosNavigation = createBottomTabNavigator({
  Schedule: ScheduleScreen,
  Speakers: SpeakersScreen,
  Map: MapScreen,
  About: AboutScreen
})

const androidNavigation = createMaterialTopTabNavigator({
  Schedule: ScheduleScreen,
  Speakers: SpeakersScreen,
  Map: MapScreen,
  About: AboutScreen
})

const RootNavigation = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Auth: AuthScreen,
  Home: Platform.OS === 'ios' ? iosNavigation : androidNavigation
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
