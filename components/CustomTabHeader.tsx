import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { router } from "expo-router";

const CustomTabHeader = () => {
  const colorScheme = useColorScheme();

  const handleButtonPress = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={handleButtonPress}
        style={[
          styles.headerButton,
          { backgroundColor: Colors[colorScheme ?? "light"].tint },
        ]}
      >
        <Text style={styles.headerButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 10,
    backgroundColor: "transparent",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerButtonText: {
    color: "black",
    fontWeight: "600",
  },
});

export default CustomTabHeader;