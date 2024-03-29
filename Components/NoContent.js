import React from 'react'
import { ScrollView, View, FlatList, SectionList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

// import SpeakerCard from './SpeakerCard.old'
import SpeakerCardSmall from './SpeakerCardSmall'
import AppSearch from '../Components/shared/layout/AppSearch'
import Loader from '../Components/shared/Loader'
import AppText from './shared/text/AppText'
import H2 from './shared/text/H2'
import ScreenBottomPadding from './shared/layout/ScreenBottomPadding'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import ContentButton from './shared/buttons/ContentButton'

const { width, height } = Dimensions.get('window')

const NoContent = (props) => (
  <ScrollView style={{flex: 1, width: width, height: height, paddingTop: 10, paddingLeft: 15, paddingRight: 15}}>
    {props.login 
      ? <View>
          <H2 dark>Login needed</H2>
          <AppText dark>This content is restricted to logged in users only. Please login to continue.</AppText>
          <ContentButton
              opaque
              style={{marginTop: 25}}
              title="Login"
              onPress={() => props.navigation.navigate('Auth')}
            />
        </View>
      : <View>
          <H2 dark>No {props.name} found</H2>
          {props.query 
            ? <AppText dark>No {props.name} found for that search query. Please try again.</AppText>
            : <AppText dark>You haven't favorited any {props.name} yet.</AppText>
          }
        </View>
    }
    <ScreenBottomPadding size={60} />
  </ScrollView>
)

export default withNavigation(NoContent)