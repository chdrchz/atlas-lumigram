import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Text style={{ color: "white" }}>Login Screen</Text>
      <Pressable>
        <Link href={"/(auth)/register"}>
            <Text style={{ color: 'white' }}>Register</Text>
        </Link>
      </Pressable>
    </View>
  );
}