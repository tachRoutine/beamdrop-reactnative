import { View, StyleSheet } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Webview() {
  const { url } = useGlobalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <WebView style={styles.container} source={{ uri: url as string }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
