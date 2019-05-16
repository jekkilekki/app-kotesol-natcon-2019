import React, { Component } from 'react'
import { StyleSheet, Button, FlatList, ScrollView, View, Dimensions, Text, TouchableOpacity, Platform, StatusBar, I18nManager } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import MyButton from './buttons/MyButton'
import AppFooterButton from './layout/AppFooterButton'
import { appGrey, appPink } from '../../utils/colors';
import ContentButton from './buttons/ContentButton';

import EntypoIcon from 'react-native-vector-icons/Entypo'
import AppText from './text/AppText';

const { width, height } = Dimensions.get('window')

class Slides extends Component {
  state = {
    slideNum: 1,
    startX: null,
    endX: null
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props !== nextProps ) {
      this._firstSlide()
    }
  }

  fbClick = () => {
    this.props.onLogin()
  }

  _nextSlide = () => {
    if ( this.state.slideNum === this.props.data.length ) {
      this._handleRedirect()
    } else {
      this.setState({ slideNum: this.state.slideNum + 1 })
    }
    if ( this.state.slideNum >= 0 ) {
      this.refs._slider.scrollTo({x: this.state.slideNum * width, y: 0, duration: 500})
    }
  }

  _previousSlide = () => {
    // this.setState({ slideNum: this.state.slideNum - 1 })
    if ( this.state.slideNum > 1 ) {
      this.setState({ slideNum: this.state.slideNum - 1 })
      this.refs._slider.scrollTo({x: (this.state.slideNum - 2) * width, y: 0, duration: 500})
    } 
  }

  _firstSlide = () => {
    this.refs._slider.scrollWithoutAnimationTo(0,0)
  }

  _setSlideNum = async (e) => {
    await this.setState({ endX: e.nativeEvent.contentOffset.x })

    if ( this.state.endX >= 0 ) {
      if ( this.state.endX > this.state.startX ) {
        this.setState({ slideNum: this.state.slideNum + 1 })
      } else {
        this.setState({ slideNum: this.state.slideNum - 1 })
      }
    }

    if ( this.state.slideNum > this.props.data.length ) {
      this._handleRedirect()
    }
  }

  _handleRedirect = () => {
    this._firstSlide()
    this.setState({ slideNum: 1 })
    
    if ( !this.props.loggedIn ) {
      this.props.navigation.navigate('Auth')
    } else {
      this.props.navigation.navigate('Home')
    }
  }

  renderSlides() {
    return this.props.data.map((slide, i) => (
      <View key={i} style={{backgroundColor: slide.color}}>
        <View style={styles.container}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.text}>{slide.text}</Text>
        </View>
      </View>
    ))
  }

  render() {
    console.log('Slides props', this.props)
    console.log('Slids state', this.state)

    return (
      <View>
      <ScrollView
        horizontal
        pagingEnabled
        style={{flex: 1}}
        ref={'_slider'}
        onScrollBeginDrag={(e) => this.setState({ startX: e.nativeEvent.contentOffset.x })}
        onScrollEndDrag={(e) => this._setSlideNum(e)}
      >
        {this.renderSlides()}      
      </ScrollView>
      <AppFooterButton backgroundColor='transparent'>
        <View style={[styles.buttonBox, {width: width / 4}]}>
          <ContentButton style={[styles.arrows, {left: 0}]} color={'white'} 
            onPress={() => this._previousSlide()}
          >
            {this.state.slideNum > 1 && <EntypoIcon color={'rgba(255,255,255,0.7)'} size={36} name={'chevron-left'} />}
          </ContentButton>
        </View>
        <View style={styles.buttonBox}>
          <ContentButton style={styles.buttonText} color={'white'} title='Skip Tutorial' onPress={this.props.onComplete} />
        </View>
        <View style={[styles.buttonBox, {width: width / 4}]}>
          <ContentButton style={[styles.arrows, {right: 0}]} color={'white'} 
            onPress={() => this._nextSlide()}
          >
            {this.state.slideNum > this.props.data.length - 1
              ? <EntypoIcon color={'rgba(255,255,255,0.7)'} size={36} name={'login'} />
              : <EntypoIcon color={'rgba(255,255,255,0.7)'} size={36} name={'chevron-right'} />
            }
          </ContentButton>
        </View>
      </AppFooterButton>
      
      
    </View>
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
  },
  buttonBox: {
    width: width / 2,
    height: 60,
    paddingTop: 10,
    // backgroundColor: 'rgba(35,35,119,0.3)',
    // paddingBottom: 10
  },
  arrows: {
    backgroundColor: 'transparent',
    position: 'absolute', 
    bottom: height / 2.5,
  }
})

const mapStateToProps = ({ app }) => {
  return { loggedIn: app.loggedIn }
}

export default withNavigation(connect(mapStateToProps)(Slides))