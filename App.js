import React from 'react'
import { WebView } from 'react-native-webview'
import { StatusBar } from 'react-native'
import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";

const App = () => {
  OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId);

  OneSignal.promptForPushNotificationsWithUserResponse();

  //Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="transparent"/>
      <WebView
        source={{ uri: 'https://app.devclub.com.br/' }}
        style={{ marginTop: 45 }}
      />
    </>
  )
}

export default App