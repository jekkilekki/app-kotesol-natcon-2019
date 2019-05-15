import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import AppText from '../text/AppText'
import { appBlack70 } from '../../../utils/colors';

const { width, height } = Dimensions.get('window')

class AppList extends Component {
  render() {
    return (
      <View style={[styles.listStyle, {marginLeft: this.props.type === 'numbered' ? 15 : 5}]}>
        {this.props.data.map((item, i) => (
          <View key={i} style={{flexDirection: 'row'}}>
            {this.props.type === 'numbered'
              ? <AppText dark style={styles.listMarker}>{i + 1})</AppText>
              : <View style={{marginTop: 8, marginRight: 8, height: 6, width: 6, borderRadius: 3, backgroundColor: this.props.lightColor ? 'rgba(255,255,255,0.7)' : appBlack70}} />
            }
            {item.strong 
              ? <View style={{flexDirection: 'row'}}>
                  <AppText dark fontFamily={'nunito-bold'}>{item.strong}
                    <AppText dark fontFamily={'nunito'}>{item.content}</AppText>
                  </AppText>
                </View>
              : <AppText style={{color: this.props.lightColor ? 'white' : '#232377'}}>{item}</AppText>
            }
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listStyle: {
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 15,
    width: width - 60
  },
  listMarker: {
    width: 20
  }
})

export default AppList