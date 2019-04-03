import React, { Component } from 'react'
import { StyleSheet, Button, FlatList, ScrollView, View, Dimensions, Text, TouchableOpacity, Platform, StatusBar, I18nManager } from 'react-native'
import MyButton from './MyButton'
import AppFooterButton from './layout/AppFooterButton'

const { width, height } = Dimensions.get('window')

class Slides extends Component {
  fbClick = () => {
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
                  icon='login'
                  title='Login with Email &amp; Password'
                  color1='#60f'
                  color2='#60f'
                  color3='#60f'
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.onLogin}>
                <MyButton 
                  icon='facebook-square'
                  text='Login with Facebook'
                />
              </TouchableOpacity>
            </View>
          }
        </View>
        {(this.props.data.length - 1 === i ) &&
          <TouchableOpacity onPress={this.props.onComplete}>
            <AppFooterButton 
              title='See the Schedule'
            />
          </TouchableOpacity>
        }
      </View>
    ))
  }

  render() {
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