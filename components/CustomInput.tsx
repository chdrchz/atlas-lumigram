import { TextInput } from "react-native";

export default function CustomInput({
  placeholder,
  secureTextEntry = false,
  onChangeText,
  value,
}) {

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="gray"
    />
  );
}