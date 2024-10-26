import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export const CustomTextarea = ({
  value,
  onChange,
  placeholder,
  multiline,
  numberOfLines,
  maxLength,
  height,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        className={`h-[${height}px] border-[1px] ${isFocused ? "border-[#212121]" : "border-neutral-color-blue-gray-100"} rounded-[8px] font-roboto-regular bg-transparent text-[14px] ${isFocused ? "text-neutral-color-gray-900" : "text-[#90A4AE]"} p-3 pb-6`}
        placeholderTextColor={isFocused ? "#212121" : "#90a3ae"}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        height={height}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Text
        className={`absolute bottom-2 right-3 text-[12px] ${isFocused ? "text-neutral-color-gray-900" : "text-neutral-color-blue-gray-300"}`}
      >
        {value.length}/{maxLength}
      </Text>
    </View>
  );
};
