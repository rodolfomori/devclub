import React from 'react'
import { WebView } from 'react-native-webview'
import { StatusBar } from 'react-native'

const App = () => {
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