import React, { Component } from 'react'
import { StyleSheet, Button, FlatList, ScrollView, View, Dimensions, Text, TouchableOpacity, Platform, StatusBar, I18nManager } from 'react-native'

const { width, height } = Dimensions.get('window')

const isIphoneX = 
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812)

class Slides extends Component {
  _renderSlides() {
    return this.props.data.map((slide, i) => (
      <View key={i} style={[styles.container, {backgroundColor: slide.color}]}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.text}>{slide.text}</Text>
        {( this.props.data.length - 1 === i ) && 
          <Button 
            title="GO!" 
            onPress={this.props.onComplete} // Problem
          /> 
        }
      </View>
    ))
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{flex: 1}}
      >
        {this._renderSlides()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 26,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '300',
    paddingHorizontal: 16
  },
  text: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16
  }
})

export default Slides