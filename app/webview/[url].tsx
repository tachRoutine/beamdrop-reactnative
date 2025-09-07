import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { WebView } from 'react-native-webview'

export default function Webview() {
  const {url} = useGlobalSearchParams()
  return (
    <View style={styles.container}>
      <WebView
      style={styles.container}
      source={{ uri: url as string }}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});