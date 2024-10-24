

# Firebase Push Notification in React Native
This repository demonstrates how to integrate Firebase Push Notifications into a React Native app. It includes setup instructions for both Android and iOS platforms using the latest @react-native-firebase packages.

# Features
Firebase Cloud Messaging (FCM) token management.
Push notifications for both foreground and background states.
Separate handling of notifications for Android and iOS platforms.
Folder Structure
bash
Copy code
/src
  /components         # UI components
  /screens            # App screens
  /utils
    firebaseNotification.js  # Firebase messaging utility functions
/App.js                # Main app entry point
/firebase.json         # Firebase configuration file
/android               # Android native files
/ios                   # iOS native files

# Requirements
Node.js (LTS)
React Native CLI (if using the CLI)
A Firebase project (Create one here)
Xcode (for iOS) and Android Studio (for Android)
# Installation
1. Install dependencies
bash
Copy code
npm install @react-native-firebase/app @react-native-firebase/messaging
2. iOS Setup
Open the ios folder in Xcode.

Add the GoogleService-Info.plist downloaded from Firebase into the project.

Ensure your Info.plist includes:

xml
Copy code
<key>UIBackgroundModes</key>
<array>
    <string>fetch</string>
    <string>remote-notification</string>
</array>
<key>FirebaseAppDelegateProxyEnabled</key>
<false/>
Run the following commands:

bash
Copy code
cd ios/
pod install
cd ..
3. Android Setup
Place the google-services.json file in the android/app/ directory.

Modify android/build.gradle:

gradle
Copy code
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'  // Latest Google services version
    }
}
Modify android/app/build.gradle:

gradle
Copy code
apply plugin: 'com.google.gms.google-services'
4. Firebase Auto Init Configuration
Create a firebase.json file at the root of your project with the following content to disable automatic initialization for messaging:

json
Copy code
{
  "react-native": {
    "messaging_android_auto_init_enabled": false,
    "messaging_ios_auto_register_for_remote_messages": false
  }
}
Usage
Import the Firebase messaging utility into App.js:

javascript
Copy code
import { useEffect } from 'react';
import { requestUserPermission, foregroundMessageListener, backgroundMessageListener } from './src/utils/firebaseNotification';
import messaging from '@react-native-firebase/messaging';
Request permissions and set up listeners in the useEffect hook:

javascript
Copy code
useEffect(() => {
  // Request notification permission
  requestUserPermission();

  // Listen for foreground messages
  const unsubscribeForeground = foregroundMessageListener();

  // Handle background messages
  backgroundMessageListener();

  return () => {
    unsubscribeForeground();
  };
}, []);
Test notifications by sending them from the Firebase Cloud Messaging console.

Handling Notifications
Foreground: You will need to manually handle and display the notification (e.g., using an Alert).
Background: Notifications will automatically appear in the system notification tray.
Testing
To test push notifications, use a physical device (emulators don't support push notifications).

Send test notifications via the Firebase Console.
Verify the app's behavior in the foreground, background, and terminated states.