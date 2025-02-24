import { View, Text, Pressable } from "react-native";
import { useAuth } from "@/components/context/AuthProvider";

export default function CustomHeader() {
  const { user, signOut, isSignedIn } = useAuth();

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
      <Text style={{ color: "white", fontSize: 20 }}>Login Screen</Text>
      
      {isSignedIn ? (
        <Pressable onPress={signOut}>
          <Text style={{ color: "white" }}>Logout ({user?.displayName})</Text>
        </Pressable>
      ) : (
        <Pressable>
          <Text style={{ color: "white" }}>Login</Text>
        </Pressable>
      )}
    </View>
  );
}