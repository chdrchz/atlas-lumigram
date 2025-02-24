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

    // Create user object from input field values
    const fakeUser = {
      id: "1",
      displayName: username,
      email: `${username}@example.com`, // Simulated email
    };

    signIn(fakeUser); // Save user info to context
    router.push("/(tabs)"); // Navigate to home screen
  };

  return (
    <View>
      <Text style={{ color: "white" }}>Login Screen</Text>
      
      <CustomInput 
        style={{ color: "white" }} 
        placeholder="Username" 
        onChangeText={setUsername} // Store input in state
      />

      <CustomInput 
        style={{ color: "white" }} 
        placeholder="Password" 
        secureTextEntry 
        onChangeText={setPassword} // Store password in state
      />

      <Pressable onPress={handleLogin}>
        <Text style={{ color: "white" }}>Log In</Text>
      </Pressable>

      <Link href={"/(auth)/register"}>
        <Text style={{ color: "white" }}>Register</Text>
      </Link>
    </View>
  );
}
