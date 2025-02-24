import { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/components/context/AuthProvider";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      displayName: username,
      email: `${username}@example.com`,
    };

    signIn(newUser);
    router.push("/(tabs)");
  };

  return (
    <View>
      <Text>Register</Text>

      <CustomInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />

      <CustomInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <CustomInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Pressable onPress={handleRegister}>
        <Text>Sign Up</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/(auth)')}>
        <Text>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}
