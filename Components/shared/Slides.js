import React, { Component } from 'react'
import { StyleSheet, Button, FlatList, ScrollView, View, Dimensions, Text, TouchableOpacity, Platform, StatusBar, I18nManager } from 'react-native'
import MyButton from './MyButton'
import ButtonBottom from './ButtonBottom'

const { width, height } = Dimensions.get('window')

const isIphoneX = 
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812)

class Slides extends Component {
  fbClick= () => {
    this.props.onLogin()
  }

  _renderSlides() {
    return this.props.data.map((slide, i) => (
      <View key={i} style={{backgroundColor: slide.color}}>
        <View style={styles.container}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.text}>{slide.text}</Text>
          {( this.props.data.length - 1 === i ) && 
            <View>
              <TouchableOpacity onPress={this.props.onLogin}>
                <MyButton 
                  icon='facebook-box'
                  text='Sign in with Facebook'
                />
              </TouchableOpacity>
            </View>
          }
        </View>
        {(this.props.data.length - 1 === i ) &&
          <TouchableOpacity onPress={this.props.onComplete}>
            <ButtonBottom 
              text='See the Schedule'
            />
          </TouchableOpacity>
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