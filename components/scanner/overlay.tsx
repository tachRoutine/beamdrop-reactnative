import ScanIcon from "@/components/scanner/ScanIcon";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import BeamIcon from "@/components/scanner/BeamIcon";
import { AppColors } from "@/constants/Colors";
import { Link } from "expo-router";

interface OverlayProps {
  onScan: () => void;
  scannedData: string;
}

export default function Overlay({ onScan, scannedData }: OverlayProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Link
        href={"/settings"}
        style={{
          position: "absolute",
          top: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <BeamIcon />
        <Text style={{ color: AppColors.white, fontSize: 24, fontWeight: "bold" }}>
          BeamDrop
        </Text>
      </Link>
      <Text style={styles.text}>Scan a QR code</Text>
      <View
        style={{
          ...styles.box,
          borderColor: scannedData ? AppColors.success : AppColors.white,
        }}
      />
      {scannedData ? (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>Beam Detected!</Text>
        </View>
      ) : null}
      <TouchableOpacity
        style={[styles.scanButton, isPressed && styles.scanButtonPressed]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={onScan}
        activeOpacity={0.8}
        disabled={!scannedData}
      >
        <LinearGradient
          colors={
            scannedData
              ? [AppColors.success, AppColors.successLight]
              : [AppColors.mutedForeground, AppColors.foreground]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <View style={styles.buttonContent}>
            <ScanIcon />
            <Text style={styles.scanButtonText}>
              {scannedData ? "Open" : "Scan"}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.overlay,
  },
  text: {
    color: AppColors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  box: {
    width: 300,
    height: 300,
    borderRadius: 20,
    borderWidth: 2,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButton: {
    position: "absolute",
    bottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    borderRadius: 50,
  },
  scanButtonPressed: {
    transform: [{ scale: 0.95 }],
    shadowOpacity: 0.2,
    elevation: 8,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    minWidth: 160,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  scanButtonText: {
    color: AppColors.white,
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scannedDataContainer: {
    position: "absolute",
    top: 120,
    backgroundColor: AppColors.overlayCard,
    borderRadius: 10,
    padding: 16,
    maxWidth: "80%",
    borderWidth: 2,
    borderColor: AppColors.border,
  },
  scannedDataText: {
    color: AppColors.success,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  urlText: {
    color: AppColors.white,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "monospace",
  },
});
