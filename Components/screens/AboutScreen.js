import React, { Component } from 'react'
import { View, Image, StyleSheet, Linking, TouchableOpacity, Platform } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import ScreenContent from '../shared/layout/ScreenContent'
import ScreenSection from '../shared/layout/ScreenSection'
import AppHeader from '../shared/layout/AppHeader'
import H1 from '../shared/text/H1'
import H3 from '../shared/text/H3'
import P from '../shared/text/P'
import AppScreenTitle from '../shared/text/AppScreenTitle';
import AppScreenSubtitle from '../shared/text/AppScreenSubtitle';
import AppText from '../shared/text/AppText'
import ContentButton from '../shared/buttons/ContentButton'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import { purpler, appPurple70, appGrey30 } from '../../utils/colors'
import AppList from '../shared/layout/AppList';
import ProfileStats from '../shared/layout/ProfileStats'

import IoniconIcon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

class AboutScreen extends Component {
  render() {
    return (
      <AppScreen background>
        <AppHeader 
          pageName='About' 
          pageSub='Sponsors, Team, Fine Print'
          noShadow
        />
        <ScreenContent noPadding style={{marginTop: Platform.OS === 'android' ? -10 : 0}}>

          <View style={styles.profileTop}>
            <View style={styles.userImgContainer}>
              <Image source={{uri: 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png'}} style={styles.userImg} />
            </View>
            <View style={styles.infoBox}>
              <AppScreenTitle center>2019 KOTESOL National Conference</AppScreenTitle>
              <AppScreenSubtitle center>May 25, 2019 • Jeonju University, Jeonju</AppScreenSubtitle>
            </View>
          </View>

          <ProfileStats />

          <ScreenSection style={[{borderTopWidth: 0}, styles.ipadStyle]}>
            <H1 style={{color: appPurple70}}>Motiva(c)tion: Sparking Learner Motivation in our Evolving Context</H1>
            <P>
              The English language teaching context is in constant flux, with our students' 
              focus on technology seemingly reducing their attention span, the rapid change 
              in student number with the low birth rate in Korea, and other factors within 
              and beyond our control. How can we as teachers, administrators, parents, and 
              members of the public take action to improve learner motivation to learn English?
            </P>
            <H3 small>Conference Booklet</H3>
            <View style={{flexDirection: 'row'}}>
              <ContentButton
                title='View Online'
                onPress={() => Linking.openURL('https://2019.conference.jnjkotesol.com')}
                style={{marginRight: 10}}
              />
              <ContentButton
                title='Download PDF'
                onPress={() => Linking.openURL('https://jnjkotesol.com/files/knc-2019-booklet.pdf')}
              />
            </View>
          </ScreenSection>

          <ScreenSection style={styles.ipadStyle}>
            <H1>Conference Code of Conduct</H1>
            <P>
              All attendees, speakers, sponsors, and volunteers at our conference 
              are required to agree with the following code of conduct. Organizers 
              will enforce this code throughout the event. We expect cooperation 
              from all participants to help ensure a safe environment for everyone.
            </P>
            <View style={{flexDirection: 'row'}}>
              <ContentButton
                title='View Code of Conduct'
                onPress={() => this.props.navigation.navigate('Conduct')}
              />
            </View>
          </ScreenSection>

          <ScreenSection style={styles.ipadStyle}>
            <H1 >Thanks to this year's Sponsors</H1>
            <P >
              Support from our amazing sponsors makes the KOTESOL National Conference possible!
            </P>
            <H3  small>Host</H3>
            <P >Jeonju University</P>
            <H3  small>Sponsors</H3>
            <AppList
              lightColor
              data={[
                'KOTESOL',
                'University of Birmingham',
                'E*Public (Oxford)',
                'SungAngDang (Cambridge)',
                'Language World (Scholastic + Cengage)',
                'Kidari English bookstore',
                'Yega Restaurant',
                '¡Ay Mamita!',
                'Mo Fac Story',
                'Jinmi & Jinmi',
                'and more...',
                
              ]}
            />
          </ScreenSection>
          <ScreenSection style={styles.ipadStyle}>
            <H1 >Privacy Policy</H1>
            <P >
              At KOTESOL, we take your personal information seriously. Here's the outline 
              of our guidlines and practices around privacy.
            </P>
            <View style={{flexDirection: 'row'}}>
              <ContentButton
                title='View Privacy Policy'
                onPress={() => this.props.navigation.navigate('Privacy')}
              />
            </View>
          </ScreenSection>
          <ScreenSection style={styles.ipadStyle}>
            <H1 >About this App</H1>
            <P >
              This app was developed by <AppText  fontFamily={'nunito-bold'}>Aaron Snowberger </AppText> 
              over the course of 2 months. 
            </P>
            <P >
              The project was built in React Native with Expo and Redux
              and was inspired by the Chain React Conference app.
            </P>
            <P >
              Thank you for downloading this app!
            </P>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity style={{marginHorizontal: 10}}
                onPress={() => Linking.openURL('https://aaron.kr')}
              >
                <MaterialCommunityIcon name={'web'} size={24} color={'rgba(255,255,255,0.7)'} />
              </TouchableOpacity>
              <TouchableOpacity style={{marginHorizontal: 10}}
                onPress={() => Linking.openURL('https://linkedin.com/in/aaronsnowberger')}
              >
                <IoniconIcon name={'logo-linkedin'} size={24} color={'rgba(255,255,255,0.7)'} />
              </TouchableOpacity>
              <TouchableOpacity style={{marginHorizontal: 10}}
                onPress={() => Linking.openURL('https://github.com/jekkilekki')}
              >
                <IoniconIcon name={'logo-github'} size={24} color={'rgba(255,255,255,0.7)'} />
              </TouchableOpacity>
              <TouchableOpacity style={{marginHorizontal: 10}}
                onPress={() => Linking.openURL('https://edudirectory.withgoogle.com/profiles/4831414625239040')}
              >
                <IoniconIcon name={'logo-google'} size={24} color={'rgba(255,255,255,0.7)'} />
              </TouchableOpacity>
            </View>
            {/* <ContentButton
              title='View source code'
              onPress={() => this.props.navigation.navigate('Privacy')}
            /> */}
          </ScreenSection>
          <ScreenBottomPadding size={140} />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ipadStyle: {
    maxWidth: 500,
    alignSelf: 'center',
  },
  userImgContainer: {
    backgroundColor: appGrey30,
    height: 150,
    width: 150,
    borderRadius: 75
  },
  userImg: {
    backgroundColor: 'white',
    height: 150,
    width: 150,
    borderRadius: 75
  },
  userImgText: {

  },
  infoBox: {
    marginTop: 20,
    marginBottom: 20
  },
  profileTop: {
    backgroundColor: purpler,
    alignItems: 'center',
    margin: -15,
    marginBottom: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15
  },
})

export default AboutScreen