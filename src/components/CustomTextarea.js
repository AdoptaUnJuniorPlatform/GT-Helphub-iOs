import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export const CustomTextarea = ({
  value,
  onChange,
  onBlur,
  placeholder,
  multiline,
  numberOfLines,
  maxLength,
  height,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: 10 }}>
      <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        className={`
          h-[${height}px] border-[1px] rounded-lg px-3 pt-2 pb-3 font-roboto-regular bg-transparent text-sm
          ${isFocused ? "border-[#212121] text-neutral-color-gray-900" : "border-neutral-color-blue-gray-100 text-[#90A4AE]"}
          `}
        placeholderTextColor={isFocused ? "#212121" : "#90A4AE"}
        height={height}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
      />
      <Text
        className={`
          absolute bottom-2 right-3 text-xs
          ${isFocused ? "text-neutral-color-gray-900" : "text-neutral-color-blue-gray-300"}
          `}
      >
        {value.length}/{maxLength}
      </Text>
    </View>
  );
};
