/* eslint-disable prettier/prettier */
import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export const InputFieldWithIcon = ({ label, value, onChangeText, placeholder, iconName }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="gap-2 mb-2">
      <Text
        className={`font-poppins-medium text-[14px] ${isFocused ? "text-neutral-color-blue-gray-400" : "text-neutral-color-blue-gray-900"}`}
      >
        {label}
      </Text>
      <View
        className={`relative border-[1px] ${isFocused ? "border-[#212121]" : "border-neutral-color-blue-gray-100"
          } rounded-[8px] h-[40px] bg-transparent flex-row items-center`}
      >
        <EvilIcons
          name={iconName}
          size={16}
          color={isFocused ? "#212121" : "#90a3ae"}
          style={{ marginLeft: 10 }}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType="numeric"
          className={`flex-1 font-roboto-regular text-[14px] ${isFocused ? "text-neutral-color-gray-900" : "text-[#90A4AE]"} p-3 pl-2`}
          placeholderTextColor={isFocused ? "#212121" : "#90a3ae"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};
