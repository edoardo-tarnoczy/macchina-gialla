// src/app/_layout.tsx
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { Chivo_400Regular } from "@expo-google-fonts/chivo";

import { colors } from "@/theme/tokens";

// Keep the splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    Chivo_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.level0Floor },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="room/[code]" />
        <Stack.Screen
          name="modals/create-room"
          options={{
            presentation: "formSheet",
            sheetGrabberVisible: true,
            contentStyle: { backgroundColor: colors.level1Chassis },
          }}
        />
        <Stack.Screen
          name="modals/join-pin"
          options={{
            presentation: "formSheet",
            sheetGrabberVisible: true,
            contentStyle: { backgroundColor: colors.level1Chassis },
          }}
        />
      </Stack>
    </>
  );
}
