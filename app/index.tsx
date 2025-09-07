import { View, Text, StatusBar } from "react-native";
import React from "react";
import Scanner from "@/components/scanner/scanner";
import { AppColors } from "@/constants/Colors";

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: AppColors.background }}>
      <Scanner />
    </View>
  );
}
