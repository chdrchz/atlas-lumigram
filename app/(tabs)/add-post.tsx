import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import CustomInput from '@/components/CustomInput';
import ImagePickerComponent from '@/components/ImagePicker';
import upload from '@/lib/storage';

async function save(imageUri: string | null) {
  if (!imageUri) {
    Alert.alert("Error", "No image selected!");
    return;
  }

  try {
    const name = imageUri.split("/").pop();
    if (!name) throw new Error("Invalid file name");

    const { downloadURL } = await upload(imageUri, name); // Call upload directly
    console.log("Image uploaded successfully:", downloadURL);
    Alert.alert("Success", "Image uploaded!");
  } catch (error) {
    console.error("Error uploading image:", error);
    Alert.alert("Upload Failed", "Please try again.");
  }
}

export default function AddPostScreen() {
  const [caption, setCaption] = useState<string | undefined>();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageSelected = (uri: string | null) => {
    console.log("Image selected:", uri);
    setImageUri(uri);
  };

  const handleReset = () => {
    setCaption(undefined);
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImagePickerComponent 
          onImageSelected={handleImageSelected} 
          imageUri={imageUri} 
        />
      </View>
      <View style={styles.buttonContainerTwo}>
        <CustomInput
          placeholder="Add a caption"
          placeholderTextColor="gray"
          secureTextEntry={false}
          onChangeText={setCaption}
          value={caption}
          style={{ color: 'black' }}
        />
        
        <View style={styles.buttonContainer}>
          <Pressable 
            style={[styles.button, styles.buttonOne]} 
            onPress={() => save(imageUri)}
          >
            <Text style={styles.text}>Save</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.button, styles.buttonTwo]} 
            onPress={handleReset}
          >
            <Text style={{ color: "black" }}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    height: "100%",
    padding: 16,
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    gap: 10,
    marginTop: 10,
  },
  buttonContainerTwo: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: "white",
    textAlign: "center",
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
  },
});
