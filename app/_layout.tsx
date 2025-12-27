import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect } from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { ProfileProvider } from "./ProfileContext";

// ✅ ROBOTO
import { useFonts } from "expo-font";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";

export const unstable_settings = {
  anchor: "(tabs)",
};

// ⛔ prevent splash from hiding early
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // ✅ LOAD FONTS ONCE
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ProfileProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false, // ✅ REMOVES EXPO PATH / HEADER EVERYWHERE
          }}
        >
          {/* TABS */}
          <Stack.Screen name="(tabs)" />

          {/* MODAL */}
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal" }}
          />
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </ProfileProvider>
  );
}
