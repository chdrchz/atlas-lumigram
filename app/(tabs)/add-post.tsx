import { View, StyleSheet, Pressable, Text } from "react-native";
import ImagePreview from "@/components/ImagePreview";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";

export default function AddPostScreen() {
  const [caption, setCaption] = useState();

  const handleReset = () => {
    setCaption(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImagePreview source={require("../../assets/images/placeholder.png")} />
      </View>
      <CustomInput
        placeholder={"Add a caption"}
        placeholderTextColor="black"
        secureTextEntry={false}
        onChangeText={setCaption}
        value={caption}
        style={{ color: 'black' }}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.buttonOne]}>
          <Text>Save</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonTwo]} onPress={handleReset}>
          <Text>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    gap: 20,
  },
  imageContainer: {
    width: "auto",
    alignSelf: "center",
  },
  buttonContainer: {
    display: "flex",
    width: "75%",
    gap: 20,
  },
  button: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonOne: {
    backgroundColor: "#1ED2AF",
  },
  buttonTwo: {
    borderWidth: 2,
    borderColor: "black",
  }
});
