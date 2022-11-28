/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect, useState } from 'react';
import OneSignal from 'react-native-onesignal';
import Constants from 'expo-constants';
import codePush from 'react-native-code-push';
import { Keyboard, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BottomMenu, TopMenu } from '../../components';
import { useHome } from '../../hooks/HomeContext';
import { Container, WebViewComponent } from './styles';

function App() {
  function checkUpdates() {
    codePush.sync();
  }

  useEffect(() => {
    checkUpdates();
  }, []);

  const {
    iFrame, setLoading, loading, iFrameKey
  } = useHome();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const webViewRef = useRef(null);

  const goback = () => {
    webViewRef.current.goBack();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const INJECTEDJAVASCRIPT = 'const meta = document.createElement(\'meta\'); meta.setAttribute(\'content\', \'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0\'); meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta); ';

  OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId);

  OneSignal.promptForPushNotificationsWithUserResponse();

  // Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      const notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  // Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification);
  });

  return (
    <Container backgroundColor={iFrame}>
      <StatusBar barStyle="light-content" translucent />
      {iFrame === 0 && (
        <WebViewComponent
          ref={webViewRef}
          scalesPageToFit={false}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          scrollEnabled
          key={iFrameKey}
          onLoad={() => setLoading(false)}
          source={{ uri: 'https://plataforma.devclub.com.br/' }}
          style={{ backgroundColor: '#121212', marginTop: 20 }}
        />
      )}
      {iFrame === 1 && (
        <WebViewComponent
          ref={webViewRef}
          scalesPageToFit={false}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          scrollEnabled
          key={iFrameKey}
          onLoad={() => setLoading(false)}
          source={{ uri: 'https://comunidade.devclub.com.br/' }}
          style={{ backgroundColor: '#2B2E33', marginBottom: 50, marginTop: 25 }}
        />
      )}
      {iFrame === 2 && (
        <WebViewComponent
          ref={webViewRef}
          scalesPageToFit={false}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          scrollEnabled
          key={iFrameKey}
          onLoad={() => setLoading(false)}
          source={{ uri: 'https://loja.devclub.com.br/' }}
          style={{ backgroundColor: '#2B2E33', marginBottom: 50, marginTop: 20 }}
        />
      )}
      {iFrame === 3 && (
        <WebViewComponent
          ref={webViewRef}
          scalesPageToFit={false}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          scrollEnabled
          key={iFrameKey}
          onLoad={() => setLoading(false)}
          source={{
            uri:
              'https://www.youtube.com/playlist?list=PLsFVybaG4mOAa9gF5q7dJfJigxAyN0SyJ',
          }}
          style={{ backgroundColor: '#2B2E33', marginBottom: 50, marginTop: 30 }}
        />
      )}
      <TopMenu goBack={goback} />
      {!isKeyboardVisible && !loading && <BottomMenu />}
      <Spinner visible={loading} animation="slide" overlayColor="#000000" />
    </Container>
  );
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.IMMEDIATE
};
export default codePush(codePushOptions)(App);
