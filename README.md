# 2019 KOTESOL National Conference App
`React Native Mobile App`
`v1.1.1`

![cover-android](https://user-images.githubusercontent.com/6644259/58683434-5a5bec80-83af-11e9-99fe-7585176ca3ee.png)

__KNC 2019__ is the mobile app &amp; conference booklet for the 2019 KOTESOL National Conference. It is a [React Native](https://facebook.github.io/react-native/) mobile app built in [Expo](https://expo.io/). It utilizes:

1. [Redux](https://redux.js.org/) to manage application state 
2. [React Navigation](https://reactnavigation.org/) for Switch, Stacked, Tabbed, and Modal Navigation
3. [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage#docsNav) for maintaining app changes

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Table of Contents

* [Overview](#overview)
  * [iOS vs Android (Differences)](#ios-vs-android-differences)
* [Installation](#installation)
* [App Functionality](#app-functionality)
  * [Welcome Screen](#welcome-screen)
  * [Schedule Screen](#schedule-screen)
    * [Searching & Filtering](#searching-filtering)
    * [My Schedule](#my-schedule)
  * [Speakers Screen](#speakers-screen)
  * [Map Screen](#map-screen)
    * [My Places](#my-places)
  * [About Screen](#about-screen)
* [Removed Functionality](#removed-functionality)
  * [Auth Screen](#auth-screen)
  * [Profile Screen](#profile-screen)
  * [Attendees Screen](#attendees-screen)
    * [My Friends](#my-friends)
  * [Push Notifications](#push-notifications)
* [Architecture](#architecture)
  * [Data Structure](#data-structure)
  * [Folder Structure](#folder-structure)
* [Future Development](#future-development)
  * [Upcoming Features](#upcoming-features)
  * [Contributing](#contributing)
* [License](#license)
* [Troubleshooting](#troubleshooting)
* [Support](#support)
* [Changelog](#changelog)

## Overview

This app was designed with 2 primary goals in mind.

1. To provide __instant access__ to the Conference schedule, talks, speakers, ~~attendees~~, and venue information in a mobile app that is downloadable from both the [Google Play](https://play.google.com/store/apps/details?id=com.jnjkotesol.conference) and [Apple App Stores](https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1464387708).
2. To allow Users to store __personalized data__ ~~with a login~~. Personalized data includes:
   - a personalized "My Schedule" of favorite talks that they can easily review
   - a personalized "My Places" list of local businesses and restaurants to try out
   - ~~a list of "My Friends" (other users of the app)  who attendeed the Conference)~~
   - ~~their own profile information - including a profile photo~~
   

### iOS vs Android

#### Devices tested

* __iOS emulator__ (Xcode 10.2 + iOS 12.1, 12.2)
  * iPad Pro
  * iPhone XR
* __Android emulator__ (Android Studio)
  * Nexus 5X
  * Pixel 3
* __LG G6__ (real device)

## Installation

Current version: `1.1.1`

This app is available to download from:

* [Google Play](https://play.google.com/store/apps/details?id=com.jnjkotesol.conference)
* [App Store](https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1464387708)

### Run in an Emulator

If you wish to download and run the source code on your local machine, you'll need a mobile device with [Expo](https://expo.io/) installed, or an iOS or Android emulator (requires more setup). To run this app on a mobile device with Expo, clone this directory to your computer with: 

```
git clone https://github.com/jekkilekki/app-kotesol-natcon-2019
```

Then, navigate to the newly created directory in your Terminal and run:

```
npm install
npm start
```

You may also replace `npm` with `yarn` if you have [Yarn](https://yarnpkg.com/en/) installed.

Be sure the [Expo app](https://expo.io/) is installed on your mobile device. Then, open the Expo app and scan the QR code from your Terminal (after running `npm start`).

More detailed instructions can be found in the official [Create React Native App](https://github.com/react-community/create-react-native-app/blob/master/README.md#quick-overview) GitHub repository or the [Expo Installation](https://docs.expo.io/versions/latest/introduction/installation) documentation.

---

## App Functionality

### List of Screens

The following is a list of Screens that the User has access to in this app.

1. `WelcomeScreen` (3-4 screen introductory slideshow)
2. `ScheduleScreen` 
   - `MyScheduleScreen`
   - `SpeakerSingleScreen` (individual speakers abstracts and bios, also linked in the SpeakerScreen)
3. `SpeakerScreen`
4. `MapScreen`
   - `MyPlacesScreen`
   - `PlaceSingleScreen` (individual place data - address, phone number, map, image)
6. `AboutScreen`
   - `ConductScreen`
   - `PrivacyScreen`

### WelcomeScreen

| Tutorial | Drawer Menu |
| --- | --- |
| ![welcome-android](https://user-images.githubusercontent.com/6644259/58683387-3dbfb480-83af-11e9-86b9-b89c20824d17.png) | ![drawer-android](https://user-images.githubusercontent.com/6644259/58683393-3e584b00-83af-11e9-9421-3ea665b7ad6d.png) |

The __WelcomeScreen__ is presented automatically on the FIRST app load only. Subsequent lauches of the app will take users directly to the Schedule (main) screen, but users always have the option to review the Welcome tutorial from the Drawer menu ("How to Use this App").

__Android__: requires sliding of the screen to view. Last screen doesn't skip automatically to the Schedule screen when pulled. User must click the "Skip" button.

__iOS__: left/right buttons work as buttons, and sliding also works. The last screen skips automatically to the Schedule screen when pulled or the button is pressed.

### ScheduleScreen

| Schedule | Search | Single |
| --- | --- | --- |
| ![schedule-android](https://user-images.githubusercontent.com/6644259/58683389-3dbfb480-83af-11e9-8425-171f07f4d34a.png) | ![search-android](https://user-images.githubusercontent.com/6644259/58683390-3e584b00-83af-11e9-996d-efba439ff0c6.png) | ![myschedule-android](https://user-images.githubusercontent.com/6644259/58683391-3e584b00-83af-11e9-8d7b-0af78a0522ec.png) |

The __ScheduleScreen__ sorts all presentations by time and groups them accordingly. This screen also displays non-speaker events such as Registration, Lunch, and the Closing Ceremony. Clicking one of the non-speaker event cards redirects users to the MapScreen.

Speaker Cards are __contracted__ by default on the ScheduleScreen. Only the plenary session is expanded.

__Functionality__
  - _Search_: Dynamically search by speaker name or presentation title 
  - _Filter_: Click the colored bar to the left of any Speaker Card to filter by that conference track (Poster session, Plenary session, etc). 
    - __iOS__ also includes a filtering menu to the right of the Search bar (but it is overlapped by the cards on Android so removed)
  - _Expand/Contract_: Click the arrow in the upper-right corner of a Speaker Card to expand the card and display more details, or contract it (current view is contracted)
  - _Like_: Click the heart in the lower-right corner to "Like" a presentation and add it to the "My Schedule" screen
  - _View Speaker Details_: Click any Speaker Card to be taken to a Single Detail view for that speaker to read their presentation abstract and bio

### SpeakerScreen

| Speakers | Speaker Detail |
| --- | --- |
| ![speakers-android](https://user-images.githubusercontent.com/6644259/58683394-3ef0e180-83af-11e9-9f08-5ef3e96fa5bb.png) | ![speaker-single-android](https://user-images.githubusercontent.com/6644259/58683400-3f897800-83af-11e9-83fa-bf385ddc6ec5.png) |

The __SpeakerScreen__ functions in much the same way as the ScheduleScreen with a few notable differences:

- All Cards are __expanded__ by default
- Only Speaker Cards are shown (no non-speaker event cards like Registration, Lunch, etc)
- _Filtering_ works by clicking the colored Track button (rather than the colored bar like on the ScheduleScreen). The expanded view of the Speaker Cards shows the Track button, but the contracted view only shows a colored bar

### MapScreen

| Venue | Maps | Single Place | MyPlaces |
| --- | --- | --- | --- |
| ![map-android](https://user-images.githubusercontent.com/6644259/58683395-3ef0e180-83af-11e9-80f2-f40b45bdbac9.png) | ![mapview-android](https://user-images.githubusercontent.com/6644259/58683403-3f897800-83af-11e9-85be-713e71b95c44.png) | ![map-single-android](https://user-images.githubusercontent.com/6644259/58683402-3f897800-83af-11e9-933c-34c335377d2f.png) | ![myplaces-android](https://user-images.githubusercontent.com/6644259/58683388-3dbfb480-83af-11e9-82c1-471ef9468a0d.png) |

The __MapScreen__ displays venue information at the top and interactive maps at the bottom of the screen. 

__Functionality__
  - _Change location:_ Clicking any of the four location buttons on the Map will center the map on that location
  - _Filter places:_ Users may filter places by type: cafe, food, drinks, hotels, or "all"
  - _View details:_ Clicking one of the map pins displays a popup with address and phone details. Clicking on the card takes users to a Single Place View that includes a photo of the building, contact info, a map, and a "Like" heart
  - _Favorites:_ Clicking the "Like" heart on a Single Place screen adds that place to the MyPlaces screen which can be directly accessed and reviewed from the Drawer menu or the MapScreen

__*iOS note:__ The MapView Component was crashing on iOS 12.3 (not 12.2 or 12.1), so was removed for distribution to the App store. In its place, there is a button to view the [Conference website](https://2019.conference.jnjkotesol.com) which also includes this location data.

### AboutScreen

| About | Conduct | Privacy |
| --- | --- | --- |
| ![about-android](https://user-images.githubusercontent.com/6644259/58683397-3ef0e180-83af-11e9-8857-225b5d896857.png) | ![conduct-android](https://user-images.githubusercontent.com/6644259/58683398-3ef0e180-83af-11e9-9bfd-7a537973cdbd.png) | ![privacy-android](https://user-images.githubusercontent.com/6644259/58683399-3f897800-83af-11e9-8d50-2b2f3d0537c7.png) |

The __AboutScreen__ contains all the conference details including separate _Code of Conduct_ and _Privacy Policy_ screens. 

The main _About_ screen includes a "stats bar" that shows how many Talks and Places have been "Liked" on this device. Clicking either of these will take users directly to either the _MySchedule_ or _MyPlaces_ screens. 

The _About_ screen also contains sponsor and development information.

---

### List of Removed Screens

The following is a list of Screens that were developed for the app, but ultimately removed for the public release of the app. In a later version of the app, these may be revisited and further developed.

1. `AuthScreen`
   - `ProfileScreen`
2. `AttendeesScreen`
   - `MyFriendsScreen`
   - `AttendeeSingleScreen`

__*Note:__ These screens were removed from the public distribution of the app in order to streamline the app approval process. Since these screens all deal with (potentially private) user data, they were removed in favor of device-specific data.

### AuthScreen

See [Authentication Flow](#authentication-flow) below for details on how the authentication process works.

The __AuthScreen__ originally would appear as the final "slide" in the Welcome tutorial on initial app load, or in place of the ProfileScreen if users were not logged in. It allows login with Facebook OR an email address and creates and stores user data in Firebase.

The __ProfileScreen__ loads a user's personal data (originally pulled into the app's local data from Firebase). The user can optionally update their profile data in two ways (with two different modals):

1. _Profile Modal:_ Allows a user to update their name, email, affiliation, and short biography. Updated data is saved to Firebase. Canceling the update restores the original user data.
2. _Photo Modal:_ Allows a user to update their photo in one of three ways:
   1. _Image URL:_ This can be copy-pasted from the Internet
   2. _Camera button:_ The app requests access to the user's Camera and if granted, allows the user to capture a new photo for their profile photo. The photo is then uploaded to, and referenced from, Firebase.
   3. _Gallery button:_ The app requests access to the user's Camera Roll and if granted, allows the user to select a photo from their Gallery to use as their profile photo. The photo again is stored in and accessed from Firebase.

### AttendeesScreen

The __AttendeesScreen__ has the same design, layout, and functionality as the _MyPlaces_ screen. It initially pulls the current user's profile out to the top - like KakaoTalk and other chat apps do. Then, it (conditionally) lists all the remaining users that Firebase has a record of.

__Conditions__
  1. _Show data:_ Each profile screen Profile Modal contains a checkbox that allows the user to selectively display their data (or not) among other Conference attendees.
  2. _Password:_ In order to prevent outside entities from adding their names to the attendees list (if not truly attendees), the second conditional checks that the password provided to allow the display of user data matches that password determined by the app (this will be stored separately in Firebase)

User data will ONLY be displayed in the _Attendees_ screen if BOTH the "show data" checkbox is checked AND the "password" is correct.

---

### Authentication Flow

The Authentication Flow is closely coupled with the app's initialization flow with multiple calls to Redux actions that determine the state of the user and the app. Therefore, Authentication Flow can best be understood in the greater context of app initialization flow as presented below:

__Redux actions__
  1. __assets_loaded:__ Preloads necessary app assets like fonts, icons, and some images
  2. __app_check_auth_status:__ 
     - _Firebase:_ Determines if the user is already logged into Firebase through this app (currently removed)
     - _AsyncStorage:_ Determines if a User Object is present in the device's AsyncStorage
  3. __app_user_logged_out:__ Fires if the device indicates the user IS NOT currently logged into Firebase, OR if there is no User Object present in AsyncStorage. This action will cause the WelcomeScreen tutorial to display.
     - _AsyncStorage:_ With the current (`v.1.1.1`) configuration that utilizes device data rather than personal data, if the user is "logged out" on the first run of the app, then a default user account is created immediately and the next action ("logged in") is run
  4. __app_user_logged_in:__ Fires if the device determines that the user IS logged into Firebase, OR if there is a User Object present in AsyncStorage. If this action is fired INSTEAD OF the previous "logged out" action, the app will bypass the WelcomeScreen tutorial and go straight to the main ScheduleScreen
  5. __profile_save:__ This action takes a received User Object - either through Facebook or Firebase authentication, or AsyncStorage - and "saves" the User data to the Redux state from which it can be used within the app. 
     - _Firebase:_ If the app is using Firebase, every time this action is fired, the app saves User data to that user's entry in the Firebase database

### ~~Firebase Authentication Flow - Detailed (removed)~~

The AuthScreen (and authentication flow) will be bypassed altogether if the device's AsyncStorage already contains a User Object - or if Firebase is enabled and the user is logged in.

_Firebase:_ There are two possible ways to login to the app:

1. Facebook
2. Email & Password

Both methods utilize Firebase to create and manage user accounts. Authentication looks like this:

#### 0. Check Authentication

* When the App first loads, check the status of `firebase.auth()`
  - If logged in
    - WelcomeScreen and AuthScreen are bypassed, (AuthScreen will be bypassed when clicking the Profile Button as well)
    - User data is fetched from Firebase, 
    - Stored in the `profile` slice of Redux state, 
    - and user is taken directly to the main App (ScheduleScreen)
  - If NOT logged in
    - load WelcomeScreen which leads to AuthScreen 
    - or if "Skipped" to the Schedule, when clicking the Profile Button and not logged in, continue with authentication flow

#### 1A. Facebook
  
1. User clicks Facebook button, and App asks for permissions
2. User confirms and logs in
3. App receives a token and user credentials from Facebook
    - App then creates a new Firebase user with this data
    - The newly created Firebase user's data is then used throughout the app
4. Continue "Joint Authentication Flow" (below)
  
#### 1B. Email & Password

1. User enters an email and password combination
2. App attempts to log user into Firebase
   - If email exists, check the password
     - If password is incorrect, return Authentication error
     - If password is correct, Login
   - If email doesn't exist, create a new user with this email / password combination
     - The newly created Firebase user's data is then used throughout the app
4. Continue "Joint Authentication Flow" (below)
  
#### 2. Joint Authentication Flow

5. User data from Firebase is saved into the `profile` slice of Redux state
6. App loads ScheduleScreen
   - When clicking on the Profile button, User is transported to the ProfileScreen to update their profile data
   - User can update or change any of their profile data
     - "Save" stores new data in Firebase
     - Clicking out or canceling the save reloads the previous copy of Redux's `profile` data
  
#### 3. Logout

When a user wants to logout, we need to reset the App to its original state (in case someone else wants to use the same device to login)

1. Logout button is pressed (on ProfileScreen)
2. Log user out of Firebase
3. Reset Redux `profile` state to INITIAL_STATE

---

## Architecture

__KNC 2019__ is a [React Native](https://facebook.github.io/react-native/) mobile app built in [Expo](https://expo.io/) which utilizes [Redux](https://redux.js.org/) to manage application state.

App updates are triggered by dispatching action creators to Redux reducers which return updated state information to the app. Components read the necessary state from the Redux store and there are no direct API calls in the components' lifecycle methods. Application level state-based props are mapped from the store rather than stored as component state.

### Folder Structure

After cloning the GitHub repository, the project directory includes the following folders:

```
app-kotesol-natcon-2019/
  .expo/
  .vscode/
  actions/
  assets/
  Components/
    navigation/
    screens/
    shared/
      buttons/
      layout/
      text/
    views/
      speaker/
      user/
  middleware/
  reducers/
  store/
  utils/
```

For future development, I'm planning to restructure some of these folders:

- to reorganize shared Components
- to remove unused Components
- to pull the `data` files out of `utils/` and into a `data/` folder

### Redux Details

- middleware
- actions
- reducers

## Future Development

Version `1.1.1` of this app is available on the [Google Play](https://play.google.com/store/apps/details?id=com.jnjkotesol.conference) and [Apple App Stores](https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1464387708). For future KOTESOL conferences, it's just a matter of swapping out the `LocationsList.json` and `SpeakersList.json` data files and changing colors to be able to utilize it for different events. 

That being said, here's an additional list of further future enhancements that should be updated or built out.

- Fix MapView bugs in iOS 12.3 to reinstate it into the iOS app
- Fix Filter menu bug in Android that causes the dropdown to render under screen content
- Push Notifications for Plenary (or possibly "Liked") sessions
- ...

### Contributing

The best way to Contribute to this app is to open an [Issue](https://github.com/jekkilekki/app-kotesol-natcon-2019/issues) on GitHub.

Pull Requests are __welcome__ especially if they help fix an Issue or solve a Problem listed in the [Future Development](#future-development) section. I want to continue development on this project and make it a viable flashcard app for learning Korean. But I may not be very responsive due to other life obligations.

## License

The __KNC 2019__ app is licensed under the [MIT open source license](https://opensource.org/licenses/MIT) and built with React Native, Expo, and Redux and uses the following third-party resources and `node` modules:

- [Create React Native App](https://github.com/react-community/create-react-native-app)
- [Expo](https://expo.io/)
- ~~[Firebase](https://firebase.google.com/) | [(NPM)](https://www.npmjs.com/package/firebase)~~
- [React Navigation](https://reactnavigation.org/) | [(NPM)](https://www.npmjs.com/package/react-navigation)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://www.npmjs.com/package/redux-thunk)

## Troubleshooting

### Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

### Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager. If you are using a VPN you may need to disable it.

### iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `npm run ios`:

* "non-zero exit code: 107"
* "You may need to install Xcode" but it is already installed
* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `npm/yarn run ios` after doing so.
3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `npm/yarn run ios`.

### QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.

## Changelog

### `1.1.1` - 2019.05.24 
 - Added MySchedule, MyPlaces, and ability to Like presentations and places
 - Fixed rendering styles for iPad device width
 - Initial Release to Apple App store

 ### `1.0.1` - 2019.05.23 
 - Fixed MapView scrolling and zooming bugs in Android

 ### `1.0.0` - 2019.05.22 
 - Initial Release to Google Play store