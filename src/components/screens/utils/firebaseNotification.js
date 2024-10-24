import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

// Request user permission for push notifications
export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();  // Get FCM Token
    }
};

// Get the device token for Firebase Cloud Messaging (FCM)
const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log('Your Firebase Token is:', fcmToken);
    } else {
        console.log('Failed to get FCM token');
    }
};

// Listen for messages when the app is in the foreground
export const foregroundMessageListener = () =>
    messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        Alert.alert('New Notification', remoteMessage.notification?.title);
    });

// Handle messages when the app is in the background or terminated
export const backgroundMessageListener = () =>
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
