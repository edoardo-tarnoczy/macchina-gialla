import { Platform } from "react-native";

// Replace this with your Mac's Actual Local IP (e.g., 192.168.1.XX)
// for testing on physical devices.
const DEV_MACHINE_IP = "192.168.1.69";

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === "android") {
      // Android Emulator special alias for localhost
      return "10.0.2.2:8000";
    }
    // For iOS Simulator or Physical Devices
    return `${DEV_MACHINE_IP}:8000`;
  }
  // This is where your production URL will go later (e.g., api.macchinagialla.it)
  return "api.macchinagialla.com";
};

const BASE_URL = getBaseUrl();

export const CONFIG = {
  API_URL: `http://${BASE_URL}`,
  WS_URL: `ws://${BASE_URL}/ws`,
};
