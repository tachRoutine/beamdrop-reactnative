import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AppColors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

const RECENT_URLS_KEY = "beamdrop_recent_urls";
const MAX_RECENT_URLS = 20;

async function getRecentUrls(): Promise<string[]> {
  const json = await AsyncStorage.getItem(RECENT_URLS_KEY);
  return json ? JSON.parse(json) : [];
}

async function addRecentUrl(url: string): Promise<string[]> {
  const urls = await getRecentUrls();
  const filtered = urls.filter((u) => u !== url);
  const updated = [url, ...filtered].slice(0, MAX_RECENT_URLS);
  await AsyncStorage.setItem(RECENT_URLS_KEY, JSON.stringify(updated));
  return updated;
}

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  return url;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [recentUrls, setRecentUrls] = useState<string[]>([]);

  const loadRecent = useCallback(async () => {
    const urls = await getRecentUrls();
    setRecentUrls(urls);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRecent();
    }, [loadRecent])
  );

  const handleGo = async () => {
    if (!url.trim()) return;
    Keyboard.dismiss();
    const normalized = normalizeUrl(url);
    const updated = await addRecentUrl(normalized);
    setRecentUrls(updated);
    setUrl("");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/webview/${encodeURIComponent(normalized)}`);
  };

  const handleRecentPress = async (item: string) => {
    const updated = await addRecentUrl(item);
    setRecentUrls(updated);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/webview/${encodeURIComponent(item)}`);
  };

  const handleScanPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/scanner" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BeamDrop</Text>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={AppColors.mutedForeground}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter URL..."
          placeholderTextColor={AppColors.mutedForeground}
          value={url}
          onChangeText={setUrl}
          onSubmitEditing={handleGo}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          returnKeyType="go"
        />
        <TouchableOpacity
          style={[styles.goButton, !url.trim() && styles.goButtonDisabled]}
          onPress={handleGo}
          disabled={!url.trim()}
        >
          <Ionicons name="arrow-forward" size={20} color={AppColors.white} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
        <Ionicons name="qr-code-outline" size={22} color={AppColors.white} />
        <Text style={styles.scanButtonText}>Scan QR Code</Text>
      </TouchableOpacity>

      {recentUrls.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.recentHeader}>Recent</Text>
          <FlatList
            data={recentUrls}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recentItem}
                onPress={() => handleRecentPress(item)}
              >
                <Ionicons
                  name="globe-outline"
                  size={18}
                  color={AppColors.mutedForeground}
                  style={styles.recentIcon}
                />
                <Text style={styles.recentText} numberOfLines={1}>
                  {item}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={AppColors.border}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: AppColors.foreground,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: AppColors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: AppColors.foreground,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  goButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  goButtonDisabled: {
    opacity: 0.4,
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 48,
    backgroundColor: AppColors.primary,
    borderRadius: 12,
    marginBottom: 28,
  },
  scanButtonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  recentSection: {
    flex: 1,
  },
  recentHeader: {
    fontSize: 15,
    fontWeight: "600",
    color: AppColors.mutedForeground,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: AppColors.card,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  recentIcon: {
    marginRight: 10,
  },
  recentText: {
    flex: 1,
    fontSize: 15,
    color: AppColors.foreground,
  },
});
