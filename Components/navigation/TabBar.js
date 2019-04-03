/* Tutorial: https://dev.to/hrastnik/lets-create-a-custom-animated-tab-bar-with-react-native-3496 */
/* Repo: https://github.com/hrastnik/react-native-custom-tab-bar */

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import posed from 'react-native-pose'

const windowWidth = Dimensions.get('window').width
const tabWidth = windowWidth / 5
const SpotLight = posed.View({
  route0: { x: 0 },
  route1: { x: tabWidth },
  route2: { x: tabWidth * 2 },
  route3: { x: tabWidth * 3 },
  route4: { x: tabWidth * 4 }
})

const Scaler = posed.View({
  active: { scale: 1.25 },
  inactive: { scale: 1 }
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    elevation: 2,
    alignItems: 'center'
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
          <View style={styles.spotLightInner} />
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
              pose={(isRouteActive && routeIndex !== 4) ? 'active' : 'inactive'}
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

export default TabBar