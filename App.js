import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { requestUserPermission, foregroundMessageListener, backgroundMessageListener } from './src/utils/firebaseNotification';
import messaging from '@react-native-firebase/messaging';

const App = () => {
    useEffect(() => {
        // Request permission and get the FCM token
        requestUserPermission();

        // Set up foreground message listener
        const unsubscribeForeground = foregroundMessageListener();

        // Set up background message handler
        backgroundMessageListener();

        // Handle when a notification is clicked and the app is opened
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('Notification caused app to open from background state:', remoteMessage.notification);
        });

        // Check if the app was opened by a notification
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state:', remoteMessage.notification);
            }
        });

        return () => {
            unsubscribeForeground(); // Unsubscribe from the foreground listener when component unmounts
        };
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Firebase Push Notification Setup</Text>
        </View>
    );
};

export default App;
