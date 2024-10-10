import { useState } from "react";
import { View, Text, TextInput } from "react-native";

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  secureTextEntry,
  keyboardType,
  backgroundColor = "transparent",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="gap-2 mb-4">
      <Text
        className={`font-poppins-medium text-[14px] ${isFocused ? "text-neutral-color-blue-gray-400" : "text-neutral-color-blue-gray-900"}`}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className={`border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] ${backgroundColor} font-roboto-regular text-[14px] text-neutral-color-gray-900  p-3`}
        placeholderTextColor={isFocused ? "#212121" : "#90a3ae"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default InputField;
