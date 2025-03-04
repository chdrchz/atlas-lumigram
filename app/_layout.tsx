import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { FirebaseAuthProvider } from "@/components/context/FirebaseAuthProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FirebaseAuthProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#00003C",
              },
              headerShadowVisible: false,
              headerTitle: "",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="light" />
        </FirebaseAuthProvider>
      </GestureHandlerRootView>
    </View>
  );
}
