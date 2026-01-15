import Overlay from "@/components/scanner/overlay";
import { BEAMDROP_PORT } from "@/constants/beamdrop";
import { AppColors } from "@/constants/Colors";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  AppState,
  Button,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import BeamIcon from "@/components/scanner/BeamIcon";
import ScanIcon from "@/components/scanner/ScanIcon";
import { StatusBar } from "expo-status-bar";
import { NeedPermissions } from "@/components/scanner/NeedPermissions";

export default function Scanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState("");
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (qrLock.current) return;

    console.log("scanned data:", data);
    if (!data) return;

    if (data.startsWith("exp:") || data.startsWith("exp+")) { // Reject exp:// and exp+:// URLs from expo while testing
      return;
    }

    setScannedData(data);
  };

  const openScannedData = async () => {
    if (scannedData && !qrLock.current) {
      qrLock.current = true;
      try {
        router.push(`/webview/${encodeURIComponent(scannedData)}`);
      } catch (error) {
        alert("Failed to open URL");
        console.error("Failed to open URL:", error);
      }
      // NOTE: Resets after 2 seconds
      // This is to prevent multiple scans of the same QR code
      setTimeout(() => {
        qrLock.current = false;
        setScannedData("");
      }, 2000);
    }
  };

  if (!permission.granted) {
    return <NeedPermissions requestPermission={requestPermission} />;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay onScan={openScannedData} scannedData={scannedData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: AppColors.background,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: AppColors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionContent: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: AppColors.foreground,
  },
  permissionCard: {
    backgroundColor: AppColors.card,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: AppColors.border,
  },
  cameraIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: AppColors.foreground,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: AppColors.border,
  },
  cameraIcon: {
    fontSize: 40,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.foreground,
    textAlign: "center",
    marginBottom: 16,
  },
  permissionMessage: {
    fontSize: 16,
    color: AppColors.mutedForeground,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  permissionButtonText: {
    color: AppColors.primaryForeground,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: AppColors.foreground,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.foreground,
  },
});
