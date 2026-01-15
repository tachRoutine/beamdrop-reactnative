import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { AppColors } from "@/constants/Colors";

const Settings = () => {
  const appVersion =
    Constants.expoConfig?.version ?? "1.0.0";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>BeamDrop</Text>
        <Text style={styles.subtitle}>Settings</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.text}>
          This is the mobile client for BeamDrop. It allows instant file transfer
          between your computer and phone over the same Wi-Fi network. No cables.
          No cloud. Just fast local transfer.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>App Version</Text>
        <Text style={styles.version}>v{appVersion}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: AppColors.foreground,
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.mutedForeground,
    marginTop: 4,
  },
  card: {
    backgroundColor: AppColors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: AppColors.mutedForeground,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  text: {
    fontSize: 15,
    color: AppColors.foreground,
    lineHeight: 22,
  },
  version: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.foreground,
  },
});
