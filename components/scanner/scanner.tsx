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
} from "react-native";

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
    if (data && data !== "exp://192.168.1.3:8081" && data.includes(BEAMDROP_PORT.toString())) {
      setScannedData(data);
    }
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
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
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
