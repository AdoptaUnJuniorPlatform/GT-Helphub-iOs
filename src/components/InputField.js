import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export const InputField = ({
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
        className={`
          font-poppins-medium text-sm
          ${isFocused ? "text-neutral-color-blue-gray-400" : "text-neutral-color-blue-gray-900"}
          `}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className={`
          border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 p-3
          ${backgroundColor}
          `}
        placeholderTextColor={isFocused ? "#212121" : "#90a3ae"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};
