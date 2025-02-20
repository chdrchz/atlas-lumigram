import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function index() {
  return (
    <View>
      <Text style={{ color: "white" }}>Verifying layout</Text>
      <Link href={"/(tabs)"}>
        <Text style={{ color: "white" }}>Click me to go to tabs</Text>
      </Link>
    </View>
  );
}
