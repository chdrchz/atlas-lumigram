import { TextInput } from "react-native";

export default function CustomInput({
  placeholder,
  secureTextEntry = false,
  onChangeText,
  value,
  style={}
}) {
  const defaultStyle = {
    borderWidth: 1,
    borderColor: "#1ED2AF",
    padding: 20,
    width: "100%",
    borderRadius: 5,
    color: 'white'
  };

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="white"
      style={{...defaultStyle, ...style}}
    />
  );
}