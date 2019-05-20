/* Tutorial: https://dev.to/hrastnik/lets-create-a-custom-animated-tab-bar-with-react-native-3496 */
/* Repo: https://github.com/hrastnik/react-native-custom-tab-bar */

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import posed from 'react-native-pose'
import { black } from '../../utils/colors';

const windowWidth = Dimensions.get('window').width
const tabWidth = windowWidth / 4
const SpotLight = posed.View({
  route0: { x: 0 },
  route1: { x: tabWidth },
  route2: { x: tabWidth * 2 },
  route3: { x: tabWidth * 3 },
  // route4: { x: tabWidth * 4 }
})

const Inner = posed.View({
  passive: {
    backgroundColor: [
      'x',
      {
        inputRange: Array.from({ length: 4 }).map(
          (_, i) => i * tabWidth
        ),
        outputRange: ["#00dddd", "#00b9f1", "#6600ff", "#d63aff"] /* Five tabs: , "#ed0972" */
      },
      true
    ],
    useNativeDriver: false
  }
})

const Scaler = posed.View({
  active: { scale: 1.25 },
  inactive: { scale: 1 }
})

const TabBar = (props) => {
  const {
    renderIcon,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = props
  
  const { routes, index: activeRouteIndex } = navigation.state 

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <SpotLight style={styles.spotLight} pose={`route${activeRouteIndex}`}>
          <Inner style={styles.spotLightInner} />
        </SpotLight>
      </View>

      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor

        return (
          <TouchableOpacity
            key={routeIndex}
            style={styles.tabButton}
            onPress={() => {
              onTabPress({ route })
            }}
            onLongPress={() => {
              onTabLongPress({ route })
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            <Scaler
              pose={(isRouteActive && routeIndex !== 3) ? 'active' : 'inactive'}
              style={styles.scaler}
            >
              {renderIcon({ route, focused: isRouteActive, tintColor })}
            </Scaler>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    elevation: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: black,
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  tabButton: { flex: 1 },
  spotLight: {
    width: tabWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spotLightInner: {
    width: 48,
    height: 48,
    backgroundColor: '#00dddd',
    borderRadius: 24,
    top: -1
  },
  scaler: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TabBar