import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo'
import Icon from 'react-native-vector-icons/AntDesign'

class MyButton extends Component {
  render() {
    return (
      <LinearGradient
        colors={[
          this.props.color1 || '#4c669f', 
          this.props.color2 || '#3b5998', 
          this.props.color3 || '#192f6a'
        ]}
        style={styles.buttonStyle}
      >
        {this.props.icon &&
          <Icon 
            name={this.props.icon} 
            size={this.props.iconSize || 20} 
            color={this.props.iconColor || '#fff'} 
          />
        }
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
    justifyContent: 'center',
    textAlign: 'center'
  }
})

export default MyButton