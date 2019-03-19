import React from 'react'
import { Platform, View, Text, Image } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Tabs, Button, Icon } from 'native-base'

import Register from '../views/user/Register'
import Login from '../views/user/Login'
import Profile from '../views/Profile'
import Schedule from '../views/Schedule'
import Speakers from '../views/Speakers'
import Sponsors from '../views/Sponsors'
import Location from '../views/Location'
import About from '../views/About'
import Feedback from '../views/Feedback'
import Tickets from '../views/Tickets'
import Conduct from '../views/Conduct'
import Privacy from '../views/Privacy'

import { tealA700, tealA400, white } from '../../utils/colors'

const appTabs = {
  Schedule: {
    screen: Schedule,
    navigationOptions: {
      tabBarLabel: 'Schedule',
      tabBarIcon: ({ tintColor }) =>
        <Icon name='clock' />
    }
  },
  Speakers: {
    screen: Speakers,
    navigationOptions: {
      tabBarLabel: 'Speakers',
      tabBarIcon: ({ tintColor }) => 
        <Icon name='albums' />
    }
  },
  Location: {
    screen: Location,
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => 
        <Icon name='map' />
    }
  },
  About: {
    screen: About,
    navigationOptions: {
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

const AuthNav = createStackNavigator({ Login: Login })

const MainNav = createStackNavigator({
  Home: TabbedNave,
  Login: Login,
  Register: Register,
  Profile: Profile,
  Feedback: Feedback,
  Conduct: Conduct,
  Privacy: Privacy,
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

export const Navigation = createSwitchNavigator({
  // AuthLoading: Loader,
  App: RootNav,
  Auth: AuthNav
}, {
  initialRouteName: 'App'
})




