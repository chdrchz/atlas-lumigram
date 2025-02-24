import { TextInput } from "react-native";

export default function CustomInput({
  placeholder,
  secureTextEntry = false,
  style = {},
  onChangeText,
  value,
}) {

  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}
