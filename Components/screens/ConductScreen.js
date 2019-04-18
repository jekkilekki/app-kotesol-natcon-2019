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

class ConductScreen extends Component {
  render() {
    return (
      <AppScreen background>
        <HeaderBack
          pageName='Code of Conduct' 
          pageSub='We take our code of conduct very seriously &amp; you should too'
        />
        <ScreenContent>
          <ScreenSection>
            <P>
              All attendees, speakers, sponsors, and volunteers for KOTESOL are required 
              to agree to the event code of conduct. Organizers will enforce this code 
              throughout the event. We are expecting cooperation from all participants 
              to establish a safe environment for all.
            </P>
            <H1>Need Help?</H1>
            <P>Find a volunteer or organizer with a KOTESOL name badge or sash and let us know.</P>
          </ScreenSection>
          <ScreenSection>
            <H1>The Quick Version</H1>
            <P>
              We are dedicated to provide a harassment-free conference experience for 
              everyone, regardless of gender, sexual orientation, disability, physical 
              appearance, body size, race, or religion. We do not tolerate harassment 
              of conference participants in any form. Sexual language and imagery is not 
              appropriate for any conference venue, including talks, workshops, parties, 
              Twitter and other online media. Conference participants violating these 
              rules may be sanctioned or expelled from the conference without a refund 
              at the discretion of the conference organizers.
            </P>
          </ScreenSection>
          <ScreenSection>
            <H1>The Less Quick Version</H1>
            <P>
              Harassment includes offensive verbal comments related to gender, sexual 
              orientation, disability, physical appearance, body size, race, religion, 
              sexual images in public spaces, deliberate intimidation, stalking, following, 
              harassing photography or recording, sustained disruption of talks or other 
              events, inappropriate physical contact, and unwelcome sexual attention.
            </P>
            <P>
              Sponsors are also subject to the anti-harassment policy. In particular, 
              sponsors should not use sexualized images, activities, or other material. 
              Booth staff (including volunteers) should not use sexualized 
              clothing/uniforms/costumes, or otherwise create a sexualized environment.
            </P>
            <P>            
              If a participant engages in harassing behaviour, the conference organizers 
              may take any action they deem appropriate, including warning the offender or 
              expulsion from the conference with no refund.
            </P>
            <P>
              If you are being harassed, notice that someone else is being harassed, or 
              have any other concerns, please contact a member of conference staff immediately. 
              Conference staff can be identified as they'll be wearing branded volunteer buttons.
            </P>
            <P>
              Conference staff will be happy to help participants contact hotel/venue security 
              or local law enforcement, provide escorts, or otherwise assist those experiencing 
              harassment to feel safe for the duration of the conference. We value your attendance.
            </P>
            <P>
              We expect participants to follow these rules at conference and workshop venues 
              and conference-related social events.
            </P>
          </ScreenSection>
          <ScreenSection>
            <P note>
              Original source and credit: http://2012.jsconf.us/#/about & The Ada Initiative
              This work is licensed under a Creative Commons Attribution 3.0 Unported License
            </P>
            <ContentButton
              title='&larr; Back to Info'
              onPress={() => this.props.navigation.goBack()}
            />
          </ScreenSection>
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

export default ConductScreen