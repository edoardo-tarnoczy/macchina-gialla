import { Platform } from "react-native";

const DEV_MACHINE_IP = "192.168.1.69";

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === "android") {
      return "10.0.2.2:8000";
    }
    return `${DEV_MACHINE_IP}:8000`;
  }
  return "api.macchinagialla.com";
};

const BASE_URL = getBaseUrl();

export const CONFIG = {
  API_URL: `http://${BASE_URL}`,
  WS_URL: `ws://${BASE_URL}/ws`,
};
