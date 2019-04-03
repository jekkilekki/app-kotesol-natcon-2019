import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { Provider } from 'react-redux'
import { Font, AnimatedRegion } from 'expo'
import { Icon } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import store from './store'
import middleware from './middleware'
import reducer from './reducers'
// import Main from './Components/Main'
// import { Navigation } from './Components/shared/Navigation'
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator, createMaterialBottomTabNavigator, createDrawerNavigator, createTabNavigator } from 'react-navigation'
import { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId } from './utils/_config'
import firebase from 'firebase'


import WelcomeScreen from './Components/screens/WelcomeScreen'
import AuthScreen from './Components/screens/AuthScreen'
import ProfileScreen from './Components/screens/ProfileScreen'
import ScheduleScreen from './Components/screens/ScheduleScreen'
import SpeakersScreen from './Components/screens/SpeakersScreen'
import MapScreen from './Components/screens/MapScreen'
import AboutScreen from './Components/screens/AboutScreen'
import MoreScreen from './Components/screens/MoreScreen'
import TabBar from './Components/navigation/TabBar'

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

const drawerNav = createDrawerNavigator({
  Schedule: ScheduleScreen,
  Speakers: SpeakersScreen,
  Map: MapScreen,
  About: AboutScreen,
})

const iosNavigation = createBottomTabNavigator({
  Schedule: {
    screen: ScheduleScreen,
    navigationOptions: {
      tabBarLabel: 'Schedule',
      tabBarIcon: ({ focused, tintColor }) => 
        <MaterialCommunityIcon name='calendar-clock' size={20} />
    },
  },
  Speakers: {
    screen: SpeakersScreen,
    navigationOptions: {
      tabBarLabel: 'Speakers',
      tabBarIcon: ({ focused, tintColor }) => 
        <EntypoIcon name='modern-mic' size={20} />
    },
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'Venue',
      tabBarIcon: ({ focused, tintColor }) => 
        <FoundationIcon name='map' size={20} />
    },
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: ({ focused, tintColor }) => 
        <EntypoIcon name='info-with-circle' size={20} />,
    },
  },
  More: {
    screen: MoreScreen,
    navigationOptions: {
      tabBarLabel: 'More',
      tabBarIcon: ({ focused, tintColor }) => 
        <EntypoIcon name='grid' size={26} />
    }
  }
}, { 
  initialRouteName: 'About',
  tabBarComponent: (props) => <TabBar {...props} />,
  // tabBarOptions: {
  //   style: {
  //     backgroundColor: '#232377',
  //     paddingTop: 10
  //   },
  //   labelStyle: {
  //     fontFamily: 'futura',
  //     textTransform: 'uppercase',
  //     color: '#fff'
  //   },
  //   activeTintColor: '#fff',
  //   inactiveTintColor: '#000'
  // },
})

/* React Nav Transitions: https://medium.com/async-la/custom-transitions-in-react-navigation-2f759408a053 */
const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index 
      const width = layout.initWidth 

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    }
  }
}

// const androidNavigation = createMaterialBottomTabNavigator({
//   Schedule: ScheduleScreen,
//   Speakers: SpeakersScreen,
//   Map: MapScreen,
//   About: AboutScreen
// })

const drawerNavigation = createDrawerNavigator({
  Welcome: WelcomeScreen,
  // Auth: this.state.loggedIn ? ProfileScreen : AuthScreen,
  Auth: AuthScreen,
  Schedule: ScheduleScreen,
  Speakers: SpeakersScreen,
  Map: MapScreen,
  About: AboutScreen
})

const RootNavigation = createSwitchNavigator({
  Welcome: WelcomeScreen,
  // Auth: this.state.loggedIn ? ProfileScreen : AuthScreen,
  Auth: AuthScreen,
  Profile: ProfileScreen,
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
