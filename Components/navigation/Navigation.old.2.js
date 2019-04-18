import React from 'react'
import { Platform, View, Text, Image } from 'react-native'
import { 
  createSwitchNavigator, 
  createStackNavigator, 
  createBottomTabNavigator, 
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import { Tabs, Button, Icon } from 'native-base'

import WelcomeScreen from '../screens/WelcomeScreen'
import AuthScreen from '../screens/AuthScreen'

import ScheduleScreen from '../screens/ScheduleScreen'
import SpeakersScreen from '../screens/SpeakersScreen'
import MapScreen from '../screens/MapScreen'
import AboutScreen from '../screens/AboutScreen';

import SettingsScreen from '../screens/SettingsScreen'
import FeedbackScreen from '../screens/FeedbackScreen';
import ConductScreen from '../screens/ConductScreen';
import PrivacyScreen from '../screens/PrivacyScreen';

import { tealA700, tealA400, white } from '../../utils/colors'

const appTabs = {
  Schedule: {
    screen: ScheduleScreen,
    defaultNavigationOptions: {
      tabBarLabel: 'Schedule',
      tabBarIcon: ({ tintColor }) =>
        <Icon name='clock' />
    }
  },
  Speakers: {
    screen: SpeakersScreen,
    defaultNavigationOptions: {
      tabBarLabel: 'Speakers',
      tabBarIcon: ({ tintColor }) => 
        <Icon name='albums' />
    }
  },
  Map: {
    screen: MapScreen,
    defaultNavigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => 
        <Icon name='map' />
    }
  },
  About: {
    screen: AboutScreen,
    defaultNavigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: ({ tintColor }) => 
        <Icon name='information-circle' />
    }
  }
}

const appTabsOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? tealA700 : white,
    inactiveTintColor: Platform.OS === 'ios' ? tealA400 : white,
    swipeEnabled: true,
    style: {
      height: Platform.OS === 'ios' ? 56 : 48,
      backgroundColor: Platform.OS === 'ios' ? white : tealA700,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      shadowOpacity: 1
    }
  }
}

const TabbedNav = Platform.OS === 'ios'
  ? createBottomTabNavigator(appTabs, appTabsOptions)
  : createMaterialTopTabNavigator(appTabs, appTabsOptions)

const AuthNav = createStackNavigator({ Auth: AuthScreen })

const MainNav = createStackNavigator({
  Welcome: WelcomeScreen,
  Home: TabbedNav,
  Auth: AuthNav,
  Settings: SettingsScreen,
  Feedback: FeedbackScreen,
  Conduct: ConductScreen,
  Privacy: PrivacyScreen,
}, {
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => {
    return ({
      title: '2019 KOTESOL National Conference',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: tealA700,
      },
      headerBackTitle: 'Back',
      headerRight: (
        <Button transparent
          onPress={() => navigation.navigate('Login')}
        >
          { Platform.OS === 'ios' 
            ? <Icon name='ios-person' style={{color: white}} />
            : <Icon name='md-person' style={{color: white}} />
          }
        </Button>
      )
    })
  }
})

const RootNav = createStackNavigator({
  Main: MainNav,
}, {
  mode: 'modal',
  headerMode: 'none'
})

const Navigation = createSwitchNavigator({
  // AuthLoading: Loader,
  App: RootNav,
  Auth: AuthNav
}, {
  initialRouteName: 'App'
})

export default Navigation


