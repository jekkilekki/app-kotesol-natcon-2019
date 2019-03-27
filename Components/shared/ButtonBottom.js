import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class MyButton extends Component {
  render() {
    return (
      <View
        style={styles.buttonStyle}
      >
        {this.props.icon &&
          <Icon 
            name={this.props.icon} 
            size={this.props.iconSize || 24} 
            color={this.props.iconColor || '#fff'} 
          />
        }
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#00dddd'
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  }
})

export default MyButton