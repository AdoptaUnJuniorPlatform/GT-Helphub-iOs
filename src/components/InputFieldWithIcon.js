import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export const InputFieldWithIcon = ({
  label,
  value,
  onChangeText,
  placeholder,
  iconName,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="gap-2 mb-2">
      <Text
        className={`
          font-poppins-medium text-sm 
          ${isFocused ? "text-neutral-color-blue-gray-400" : "text-neutral-color-blue-gray-900"}
          `}
      >
        {label}
      </Text>
      <View
        className={`
          relative border-[1px] rounded-lg h-[40px] bg-transparent flex-row items-center
          ${isFocused ? "border-[#212121]" : error ? "border-red-error" : "border-neutral-color-blue-gray-100"}
          
          `}
      >
        <EvilIcons
          name={iconName}
          size={16}
          color={isFocused ? "#212121" : error ? "#f22929" : "#90a3ae"}
          style={{ marginLeft: 10 }}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType="numeric"
          className={`
            flex-1 font-roboto-regular text-sm px-3 pb-1 pl-2
            ${isFocused ? "text-neutral-color-gray-900" : "text-[#90A4AE]"}
            `}
          placeholderTextColor={isFocused ? "#212121" : "#90a3ae"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};
