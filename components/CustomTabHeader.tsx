import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuth } from "@/components/context/AuthProvider";
import { router } from "expo-router";

export default function CustomHeader({ backgroundColor }) {
  const { user, signOut, isSignedIn } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {isSignedIn ? (
        <Pressable style={styles.button} onPress={signOut}>
          <Text>Welcome, ({user?.displayName}) Logout</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button} onPress={() => router.replace("/(auth)")}>
          <Text>Login</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 50,
    paddingBottom: 10,
    paddingRight: 25,
  },
  button: {
    padding: 10,
    backgroundColor: "#1ED2AF",
    borderRadius: 15,
  }
})