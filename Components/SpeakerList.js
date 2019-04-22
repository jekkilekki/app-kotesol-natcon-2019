import React, { Component } from 'react'
import { ScrollView, View, FlatList, SectionList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import SpeakerCard from './SpeakerCard'
import AppSearch from '../Components/shared/layout/AppSearch'
import Loader from '../Components/shared/Loader'
import AppText from './shared/text/AppText'
import H2 from './shared/text/H2'

class SpeakerList extends Component {
  state = {
    searchValue: '',
    speakerList: [],
    speakerSectionList: [],
    loading: true
  }

  componentDidMount() {
    const speakerData = this._groupByTime(this.props.speakers)
    const speakerArray = Object.keys(speakerData).map(i => speakerData[i])
    let speakerSections = []

    for ( var i = 0; i < speakerArray.length; i++ ) {
      let sectionObj = {}
      sectionObj.title = this._getTimeString(speakerArray[i][0].time)
      sectionObj.data = speakerArray[i] 
      sectionObj.key = i
      speakerSections.push(sectionObj)
    }

    const allDay = speakerSections.pop()
    speakerSections.unshift(allDay)

    this.setState({ 
      speakerSectionList: speakerSections, 
      loading: false 
    })
  }

  _groupByTime = (array) => 
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj['time']
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
      return objectsByKeyValue
    }, {})

  _getTimeString(time) {
    switch (time) {
      case '13:00':
        return '1:00'
      case '14:00':
        return '2:00'
      case '15:00':
        return '3:00'
      case '16:00':
        return '4:00'
      default:
        return time
    }
  }

  renderList() {
    const { speakers } = this.props
    return (
      <FlatList
        data={speakers}
        renderItem={(speaker) => 
          <SpeakerCard speaker={speaker} filter={this.props.filter} />
        }
        keyExtractor={(speaker) => String(speaker.id)}
      />
    )
  }

  renderSchedule() {
    return (
      <SectionList
        sections={this.state.speakerSectionList}
        renderItem={(speaker) => 
          <SpeakerCard speaker={speaker} filter={this.props.filter} />
        }
        renderSectionHeader={({section}) => (
            <View style={styles.sectionBox}>
              <View style={styles.sectionDivider} />
              <H2 style={styles.sectionTitle}>{section.title}</H2>
            </View>
          )
        }
      />
    )
  }

  render() {
    const { loading } = this.state
    const { speakers } = this.props

    console.log(this.state.speakerSectionList)

    if ( loading ) {
      return <Loader />
    }

    return (
      // @TODO: Make a "full view" (like now) and a "compact view" for faster scanning - like Gmail

      <ScrollView style={{flex: 1}}>
        { this.props.schedule ? 
            this.renderSchedule() :
            this.renderList()
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  sectionDivider: {
    width: '100%',
    height: 1,
    borderBottomWidth: 3,
    borderColor: '#232377'
  },
  sectionTitle: {
    color: '#232377',
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: -5,
  }
})

export default SpeakerList