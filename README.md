# KOTESOL 2019 National Conference App
`React Native Mobile App`

__KNC 2019__ is the mobile app &amp; conference booklet for the 2019 KOTESOL National Conference. It is a [React Native](https://facebook.github.io/react-native/) mobile app built in [Expo](https://expo.io/). It utilizes:

1. [Redux](https://redux.js.org/) to manage application state 
2. [React Navigation](https://reactnavigation.org/) for Switch, Stacked, Tabbed, and Modal Navigation
3. [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage#docsNav) for maintaining app changes
4. [Expo Notifications](https://docs.expo.io/versions/latest/sdk/notifications) to set a reminder for the Plenary presentation

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Table of Contents

* [Overview](#overview)
  * [iOS vs Android (Devices Tested)](#ios-vs-android)
* [Installation](#installation)
* [App Functionality](#writing-and-running-tests)
  * [Deck List](#deck-list)
    * [Add Deck](#add-deck)
    * [Single Deck View](#single-deck-view)
    * [Add Cards to Deck](#add-cards-to-deck)
    * [Studying and Quizzing](#studying-and-quizzing)
    * [Quiz Results](#quiz-results)
  * [Card List](#card-list)
    * [Single Card View](#single-card-view)
  * [Login and Signup](#login-and-signup)
* [Architecture](#architecture)
  * [Data Structure](#data-structure)
  * [Folder Structure](#folder-structure)
* [Future Development](#future-development)
  * [Upcoming Features](#upcoming-features)
  * [Contributing](#contributing)
* [License](#license)
* [Troubleshooting](#troubleshooting)
* [Changelog](#changelog)

## Overview

This app was designed with 2 primary goals in mind.

1. To provide __instant access__ to the Conference schedule, talks, speakers, attendees, and venue information in a mobile app that [will be] downloadable from both the Google Play and Apple App Stores.
2. To allow Users to store __personalized data__ with a login - utilizing either Facebook OAuth, or an email and password (Firebase). Personalized data includes:
  - their own profile information - including a profile photo
  - a list of Contacts or "Friends" who are also users of the app (attendees at the Conference)
  - a personalized schedule of "Favorite" talks that they can easily review
  - [upcoming] a personalized "Favorites" list of local businesses and restaurants to try out

### iOS vs Android

#### Devices tested

* __iOS emulator__ (Xcode 9 + iOS 11.1)
* __Android emulator__ (Android Studio + Nexus 5)
* [upcoming] __LG G6__ (real device, network access)

## Installation

The easiest way to install and run this app is on an actual device (rather than an emulator - which requires more setup). 

At its most basic, clone this directory to your computer with: 

```
git clone https://github.com/jekkilekki/reactnd-flashcards
```

Then, navigate to the newly created directory in your Terminal and run:

```
npm install
npm start
```

You may also replace `npm` with `yarn` if you have [Yarn](https://yarnpkg.com/en/) installed.

Next, install the [Expo app](https://expo.io/) on your Android or iOS device.<br />
Finally, open the Expo app and scan the QR code from your Terminal (after running `npm start`).

More detailed instructions can be found in the official [Create React Native App](https://github.com/react-community/create-react-native-app/blob/master/README.md#quick-overview) GitHub repository or the [Expo Installation](https://docs.expo.io/versions/latest/introduction/installation) documentation.

## App Functionality

The following is a list of Screens that the User has access to in this app:

1. Before Authentication
  1. WelcomeScreen (3-4 screen introductory slideshow)
  2. AuthScreen (login)
  3. ScheduleScreen 
  4. SpeakerScreen
    - SpeakerSingleScreen (individual speakers abstracts and bios)
  5. VenueScreen
  6. AboutScreen
    - PrivacyScreen
    - ConductScreen
  6. MoreScreen (app sitemap and extras)
    - TicketScreen (?)
2. After Authentication
  1. ProfileScreen
    - MyScheduleScreen (also new tab on ScheduleScreen)
    - MyFriendsScreen
  2. AttendeesScreen

### Authentication Flow

The AuthScreen (and authentication flow) will be bypassed altogether if the device's AsyncStorage already contains an authentication token.

There are two possible ways (currently) to login to the app:

1. Facebook
2. Email & Password

Both methods utilize Firebase to create and manage user accounts. Authentication looks like this:

#### 0. Check Authentication Token

* When the App first loads, it checks AsyncStorage for an authentication token (granted by Facebook OR generated randomly if using an email/password login)
  - If token exists (i.e. user has logged in before)
    - WelcomeScreen and AuthScreen are bypassed, (AuthScreen will be bypassed when clicking the Profile Button as well)
    - User data is fetched from Firebase, 
    - Stored in the `profile` slice of Redux state, 
    - and user is taken directly to the main App (ScheduleScreen)
  - If token doesn't exist (i.e. user appears to have not logged in before)
    - load WelcomeScreen which leads to AuthScreen 
    - or if "Skipped", when clicking the Profile Button and not logged,
    - continue with authentication flow

#### 1A. Facebook
  
1. User clicks Facebook button, and App asks for permissions
2. User confirms and logs in
3. App receives a token and user credentials from Facebook
  - App saves this token to AsyncStorage
4. Continue "Joint Authentication Flow" (below)
  
#### 1B. Email & Password

1. User enters an email and password combination
2. App attempts to log user into Firebase
  - If email exists, check the password
    - If password is incorrect, return Authentication error
    - If password is correct, Login
  - If email doesn't exist, create a new user with this email / password combination
3. App generates a random authentication "token" to be stored with the user data
  - App saves this token to AsyncStorage
4. Continue "Joint Authentication Flow" (below)
  
#### 2. Joint Authentication Flow

5. App then queries Firebase to check if we already have a user account with this token
  - If yes, App retrieves user data from Firebase and saves it into the `profile` slice of Redux state
  - If no, App stores Facebook's user credential data into the `profile` slice of Redux state
6. User is transported to the ProfileScreen which accesses and loads the `profile` data from Redux
7. User can update or change any of their profile data
8. User "Saves" their profile
9. App immediately sends this data to the Firebase user account (based on uid)
  - A Firebase user account will be created if one doesn't currently exist
  
#### 3. Logout

When a user wants to logout, we need to reset the App to its original state (in case someone else wants to use the same device to login)

1. Logout button is pressed (on ProfileScreen)
2. Store data in the profile screen to Firebase (ask for confirmation?)
3. Log user out of Firebase
4. Clear the authentication token from AsyncStorage
5. Reset Redux `profile` state to INITIAL_STATE

### WelcomeScreen

### AuthScreen

### ScheduleScreen

### SpeakerScreen

#### SpeakerSingleScreen

### VenueScreen

### AboutScreen

#### PrivacyScreen

#### ConductScreen

### MoreScreen

#### TicketScreen

### ProfileScreen

#### MyScheduleScreen

#### MyFriendsScreen

### AttendeeScreen
