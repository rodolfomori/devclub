import React from 'react'
import { WebView } from 'react-native-webview'
import { StatusBar } from 'expo-status-bar'
import OneSignal from 'react-native-onesignal'
import Constants from 'expo-constants'
import codePush from 'react-native-code-push'
import { View } from 'react-native'

const App = () => {
  const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `

  OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId)

  OneSignal.promptForPushNotificationsWithUserResponse()

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      )
      let notification = notificationReceivedEvent.getNotification()
      console.log('notification: ', notification)
      const data = notification.additionalData
      console.log('additionalData: ', data)
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification)
    },
  )

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification)
  })

  return (
    <View style={{ backgroundColor: '#121212', flex: 1 }}>
      <StatusBar style="light" />

      <WebView
        scalesPageToFit={false}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        scrollEnabled
        source={{ uri: 'https://app.devclub.com.br/' }}
        style={{ marginTop: 45, backgroundColor: '#121212' }}
      />
    </View>
  )
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }

export default codePush(codePushOptions)(App)
