import React, { Component } from 'react'
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import ScreenContent from '../shared/layout/ScreenContent'
import ScreenSection from '../shared/layout/ScreenSection'
import AppHeader from '../shared/layout/AppHeader'
import H1 from '../shared/text/H1'
import H2 from '../shared/text/H2'
import H3 from '../shared/text/H3'
import P from '../shared/text/P'
import AppText from '../shared/text/AppText'
import ContentButton from '../shared/buttons/ContentButton'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import { purpler, appPurple, appPurple70, appTeal, appTeal70, appOrange, appOrange70, appPink, appPink70, appBlue, appBlue70, appGrey, appGrey70 } from '../../utils/colors'
import AppList from '../shared/layout/AppList';

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
        <ScreenContent>
          <ScreenSection style={{borderTopWidth: 0}}>
            {/* <H1>Wifi Network</H1>
            <AppText>
              Thanks to Jeonju University's cooperation to ensure wifi connectivity for our attendees.
            </AppText>
            <H3 small>Wifi Network</H3>
            <AppText>jjuniv_smartphone</AppText>
            <H3 small>Password</H3>
            <AppText>kotesol_2019</AppText> */}
            <H1 style={{color: appPurple70}}>Motiva(c)tion: <H1 style={{color: appPurple70}}>Sparking Learner Motivation in our Evolving Context</H1></H1>
            <H3 small>May 25, 2019</H3>
            <H3 style={{paddingTop: 0, marginTop: -5, marginBottom: 10}}>Star Center, Jeonju University, Jeonju</H3>
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
                onPress={() => this.props.navigation.navigate('Conduct')}
              />
            </View>
            
            {/* <H3 small>Wifi Network</H3>
            <AppText>jjuniv_smartphone</AppText>
            <H3 small>Password</H3>
            <AppText>kotesol_2019</AppText> */}
          </ScreenSection>
          <ScreenSection>
            <H1>Conference Code of Conduct</H1>
            <P>
              All attendees, speakers, sponsors, and volunteers at our conference 
              are required to agree with the following code of conduct. Organizers 
              will enforce this code throughout the event. We expect cooperation 
              from all participants to help ensure a safe environment for everyone.
            </P>
            <ContentButton
              title='View Code of Conduct'
              onPress={() => this.props.navigation.navigate('Conduct')}
            />
          </ScreenSection>
          <ScreenSection>
            <H1>Thanks to this year's Sponsors</H1>
            <P>
              Support from our amazing sponsors makes the KOTESOL National Conference possible!
            </P>
            <H3 small>Host</H3>
            <P>Jeonju University</P>
            <H3 small>Sponsors</H3>
            <AppList
              lightColor
              data={[
                'KOTESOL',
                'University of Birmingham',
                'E*Public (Oxford)',
                'Kidari English bookstore',
                'Yega Restaurant',
                'Mo Fac Story',
                'Jinmi & Jinmi',
                'and more...',
                
              ]}
            />
          </ScreenSection>
          <ScreenSection>
            <H1>Privacy Policy</H1>
            <P>
              At KOTESOL, we take your personal information seriously. Here's the outline 
              of our guidlines and practices around privacy.
            </P>
            <ContentButton
              title='View Privacy Policy'
              onPress={() => this.props.navigation.navigate('Privacy')}
            />
          </ScreenSection>
          <ScreenSection>
            <H1>About this App</H1>
            <P>
              This app was developed by <AppText fontFamily={'nunito-bold'}>Aaron Snowberger </AppText> 
              over the course of 2 months. 
            </P>
            <P>
              The project was built in React Native using Expo, Redux, and Firebase
              and was inspired by the Chain React Conference app.
            </P>
            <P>
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
  }
})

export default AboutScreen