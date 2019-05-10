import React from 'react'
import { 
  createAppContainer, 
  createDrawerNavigator,
  createSwitchNavigator, 
  createStackNavigator, 
  createBottomTabNavigator, 
} from 'react-navigation'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import IoniconIcon from 'react-native-vector-icons/Ionicons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import WelcomeScreen from '../screens/WelcomeScreen'
import AuthScreen from '../screens/AuthScreen'
import ProfileScreen from '../screens/ProfileScreen'
import AttendeesScreen from '../screens/AttendeesScreen'
import AttendeeSingleScreen from '../screens/AttendeeSingleScreen'
import MyFriendsScreen from '../screens/MyFriendsScreen'
import ScheduleScreen from '../screens/ScheduleScreen'
import MyScheduleScreen from '../screens/MyScheduleScreen'
import SpeakersScreen from '../screens/SpeakersScreen'
import SessionSingleScreen from '../screens/SessionSingleScreen'
import MapScreen from '../screens/MapScreen'
import MyPlacesScreen from '../screens/MyPlacesScreen'
import AboutScreen from '../screens/AboutScreen'
import MoreScreen from '../screens/MoreScreen'
import ConductScreen from '../screens/ConductScreen'
import PrivacyScreen from '../screens/PrivacyScreen'
import TabBar from './TabBar'
import MyTabBar from './MyTabBar'
import DrawerComponent from './DrawerComponent'
import { purpler } from '../../utils/colors';

const myScheduleNav = createStackNavigator({
  Schedule: {
    screen: ScheduleScreen,
  },
  MySchedule: {
    screen: MyScheduleScreen
  }
}, { 
  initialRouteName: 'Schedule',
  headerMode: 'none',
})

const myPlacesNav = createStackNavigator({
  Map: {
    screen: MapScreen,
  },
  MyPlaces: {
    screen: MyPlacesScreen
  }
}, { 
  initialRouteName: 'Map',
  headerMode: 'none',
})

const myFriendsNav = createStackNavigator({
  People: {
    screen: AttendeesScreen,
  },
  MyFriends: {
    screen: MyFriendsScreen
  }
}, { 
  initialRouteName: 'People',
  headerMode: 'none',
})

/* Main Tabbed Navigation in MAIN Screen Flow */
const tabNavigation = createBottomTabNavigator({
  Schedule: {
    screen: myScheduleNav,
    navigationOptions: {
      tabBarLabel: 'Schedule',
      tabBarIcon: ({ focused, tintColor }) => 
        <MaterialCommunityIcon name='calendar-clock' size={20} color={tintColor} focused={focused} />
    },
  },
  Speakers: {
    screen: SpeakersScreen,
    navigationOptions: {
      tabBarLabel: 'Speakers',
      tabBarIcon: ({ focused, tintColor }) => 
        <EntypoIcon name='modern-mic' size={20} color={tintColor} focused={focused} />
    },
  },
  Map: {
    screen: myPlacesNav,
    navigationOptions: {
      tabBarLabel: 'Venue',
      tabBarIcon: ({ focused, tintColor }) => 
        <FoundationIcon name='map' size={20} color={tintColor} focused={focused} />
    },
  },
  People: {
    screen: myFriendsNav,
    navigationOptions: {
      tabBarLabel: 'Attendees',
      tabBarIcon: ({ focused, tintColor }) => 
        <FoundationIcon name='torsos-female-male' size={20} color={tintColor} focused={focused} />,
    },
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: ({ focused, tintColor }) => 
        <EntypoIcon name='info-with-circle' size={20} color={tintColor} focused={focused} />,
    },
  },
}, { 
  // initialRouteName: 'Map',
  tabBarComponent: (props) => 
    <TabBar tabColors={["#f62626", "#ff8a14", "#e5ff0a", "#21ff30", "#196eff"]} {...props} />,
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#201b48'
  },
})

/* Stack Nav for "Back" button functionality on different Screens */
const stackNav = createStackNavigator({
  Home: tabNavigation,
  Session: SessionSingleScreen,
  Person: AttendeeSingleScreen,
  Conduct: ConductScreen,
  Privacy: PrivacyScreen
}, { 
  initialRouteName: 'Home',
  // mode: 'modal',
  headerMode: 'none',
  headerBackTitleStyle: {
    color: '#00dddd'
  },
  navigationOptions: {
    // headerVisible: false,
    // headerBackground: {
    //   backgroundColor: purpler
    // }
  } 
})

const drawerNav = createDrawerNavigator({
  Profile: ProfileScreen,
  Schedule: tabNavigation,
  Speakers: tabNavigation,
  Location: tabNavigation,
  People: tabNavigation,
  About: tabNavigation,
  Tutorial: WelcomeScreen,
  // MyFriends: MyFriendScreen,
  MySchedule: MyScheduleScreen,
  // MyPlaces: MyPlacesScreen,
  Settings: ProfileScreen,
  Session: stackNav
}, {
  drawerPosition: 'right',
  overlayColor: '#151537',
  drawerBackgroundColor: '#353577',
  contentComponent: DrawerComponent,
  contentOptions: {
    activeTintColor: '#00dddd',
    activeBackgroundColor: '#232377',
    inactiveTintColor: '#fff'
  }
})

/* Switch Nav to prevent "Back" button functionality on these pages */
export const RootNavigation = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Auth: AuthScreen,
  App: drawerNav,
}, {
  initialRouteName: 'Welcome',
})

export const AppNavigation = createAppContainer(RootNavigation)