import { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/components/context/AuthProvider";
import { Link, useRouter } from "expo-router";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    const fakeUser = {
      id: "1",
      displayName: username,
      email: `${username}@example.com`,
    };

    signIn(fakeUser);
    router.push("/(tabs)");
  };

  return (
    <View>
      <Text style={{ color: "white" }}>Login</Text>
      
      <CustomInput 
        style={{ color: "white" }}
        placeholder="Username"
        onChangeText={setUsername} value={username}      />

      <CustomInput 
        style={{ color: "white" }}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword} value={password}      />

      <Pressable onPress={handleLogin}>
        <Text style={{ color: "white" }}>Sign In</Text>
      </Pressable>
      <Link href={"/(auth)/register"}>
        <Text style={{ color: "white" }}>Create a new account</Text>
      </Link>
    </View>
  );
}
