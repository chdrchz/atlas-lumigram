import { View, Text, Pressable } from "react-native";
import { useAuth } from "@/components/context/AuthProvider";

export default function CustomHeader() {
  const { user, signOut, isSignedIn } = useAuth();

  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 16 }}>
      
      {isSignedIn ? (
        <Pressable onPress={signOut}>
          <Text>Logout</Text>
        </Pressable>
      ) : (
        <Pressable>
          <Text>Login</Text>
        </Pressable>
      )}
    </View>
  );
}