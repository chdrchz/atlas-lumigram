import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function RegisterScreen() {
  return (
    <View>
      <Text style={{ color: "white" }}>Register Screen</Text>
      <Pressable>
        <Link href={"/(auth)/login"}>
            <Text style={{ color: 'white' }}>Login</Text>
        </Link>
      </Pressable>
    </View>
  );
}