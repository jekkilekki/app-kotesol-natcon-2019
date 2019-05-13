import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import ScreenContent from '../shared/layout/ScreenContent'
import ScreenSection from '../shared/layout/ScreenSection'
import HeaderBack from '../shared/layout/HeaderBack'
import H1 from '../shared/text/H1'
import H3 from '../shared/text/H3'
import P from '../shared/text/P'
import AppText from '../shared/text/AppText'
import ContentButton from '../shared/buttons/ContentButton'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import AppScreenTitle from '../shared/text/AppScreenTitle';
import AppScreenSubtitle from '../shared/text/AppScreenSubtitle';

class PrivacyScreen extends Component {
  render() {
    return (
      <AppScreen background>
        <HeaderBack
          // pageName='Privacy Policy' 
          // pageSub='We take your personal information seriously'
        />
        <ScreenContent>
          <View style={{marginBottom: 25}}>
            <AppScreenTitle>Privacy Policy</AppScreenTitle>
            <AppScreenSubtitle>We take your personal information seriously</AppScreenSubtitle>
          </View>
          <ScreenSection>
            <H1>Information Collection &amp; Use</H1>
            <P>
              KOTESOL and its partners will not sell, share, or rent this information 
              to others in ways different from what is disclosed on this page. No 
              personal information is collected on this domain, and registration and 
              processing information is only collected for attendance purposes.
            </P>
          </ScreenSection>
          <ScreenSection>
            <H1>Cookies, IP Addresses &amp; Statistics</H1>
            <P>
              A cookie is a piece of data stored on the user’s hard drive containing 
              information about the user. We do not require any form of login or user 
              account for this website. If a user rejects the cookie, they may still 
              use this site.
            </P>
            <P>
              An Internet Protocol (IP) address is a numerical identification that your 
              computer or other browsing device sends out. We use cookies and IP 
              addresses to analyze trends, administer the site, track user’s movement, 
              and gather broad demographic information for aggregate use. Cookies and IP 
              addresses are not linked to personally identifiable information.
            </P>
            <P>
              This site does not store any cookies.
            </P>
          </ScreenSection>
          <ScreenSection>
            <H1>Sharing</H1>
            <P>
              KOTESOL and its partners will not, under any circumstances, share with any 
              third party individual IP addresses, email addresses, personal contact 
              details or other information collected through this website or related 
              statistic tracking systems. If information sharing is required for the purposes 
              of this or any other event, you will be given immediate notice.
            </P>
          </ScreenSection>
          <ScreenSection>
            <H1>External Links</H1>
            <P>
              This website contains links to other sites. Please be aware that we are not 
              responsible for the privacy practices of such other sites. We encourage you 
              to be aware that when you leave this site, you are responsible for reading 
              the privacy statements of every web site that collects personally identifiable 
              information. This privacy policy applies solely to information collected by this 
              web site.
            </P>
            <ContentButton
              title='Back to Info'
              onPress={() => this.props.navigation.goBack()}
            />
          </ScreenSection>
          <ScreenBottomPadding size={120} />
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

export default PrivacyScreen