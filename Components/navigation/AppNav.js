import React from 'react'
import { Platform } from 'react-native'
import { 
  createAppContainer, 
  createDrawerNavigator,
  createSwitchNavigator, 
  createStackNavigator, 
  createBottomTabNavigator, 
  createMaterialTopTabNavigator
} from 'react-navigation'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import IoniconIcon from 'react-native-vector-icons/Ionicons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import WelcomeScreen from '../screens/WelcomeScreen'
import AuthScreen from '../screens/AuthScreen'
import ProfileScreen from '../screens/ProfileScreen'
import AttendeesScreen from '../screens/AttendeesScreen'
// import MyFriendsScreen from '../screens/MyFriendsScreen'
import ScheduleScreen from '../screens/ScheduleScreen'
import MyScheduleScreen from '../screens/MyScheduleScreen'
import SpeakersScreen from '../screens/SpeakersScreen'
import SessionSingleScreen from '../screens/SessionSingleScreen'
import MapScreen from '../screens/MapScreen'
// import MyPlacesScreen from '../screens/MyPlacesScreen'
import AboutScreen from '../screens/AboutScreen'
import MoreScreen from '../screens/MoreScreen'
import ConductScreen from '../screens/ConductScreen'
import PrivacyScreen from '../screens/PrivacyScreen'
import TabBar from './TabBar'
import MyTabBar from './MyTabBar'
import DrawerComponent from './DrawerComponent'
import { black } from '../../utils/colors';

const myScheduleNav = createMaterialTopTabNavigator({
  Schedule: {
    screen: ScheduleScreen,
  },
  MySchedule: {
    screen: MyScheduleScreen
  }
}, { 
  initialRouteName: 'Schedule',
  tabBarComponent: (props) => 
    <MyTabBar {...props} />,
  tabBarOptions: {
    // style: {
    //   backgroundColor: '#232377',
    //   paddingTop: 10,
    //   shadowColor: black,
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.2,
    // elevation: 2,
    // },
    // labelStyle: {
    //   fontFamily: 'futura',
    //   textTransform: 'uppercase',
    //   color: '#fff'
    // },
    activeTintColor: '#fff',
    inactiveTintColor: '#201b48'
  }
})

/* Main Tabbed Navigation in MAIN Screen Flow */
const tabNavigation = createBottomTabNavigator({
  Schedule: {
    screen: ScheduleScreen,
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
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'Venue',
      tabBarIcon: ({ focused, tintColor }) => 
        <FoundationIcon name='map' size={20} color={tintColor} focused={focused} />
    },
  },
  People: {
    screen: AttendeesScreen,
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
  // More: {
  //   screen: MoreScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'More',
  //     tabBarIcon: ({ focused, tintColor }) => 
  //       <EntypoIcon name='grid' size={26} color={tintColor} focused={focused} />
  //   }
  // }
}, { 
  // initialRouteName: 'Map',
  tabBarComponent: (props) => 
    <TabBar tabColors={["#f62626", "#ff8a14", "#e5ff0a", "#21ff30", "#196eff"]} {...props} />,
  tabBarOptions: {
    // style: {
    //   backgroundColor: '#232377',
    //   paddingTop: 10,
    //   shadowColor: black,
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.2,
    // elevation: 2,
    // },
    // labelStyle: {
    //   fontFamily: 'futura',
    //   textTransform: 'uppercase',
    //   color: '#fff'
    // },
    activeTintColor: '#fff',
    inactiveTintColor: '#201b48'
  },
})

/* Stack Nav for "Back" button functionality on different Screens */
const stackNav = createStackNavigator({
  Home: tabNavigation,
  Session: SessionSingleScreen,
  // Profile: ProfileScreen,
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
    headerVisible: false
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