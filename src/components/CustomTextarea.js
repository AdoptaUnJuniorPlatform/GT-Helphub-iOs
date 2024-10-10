import { useState } from "react";
import { View, Text, TextInput } from "react-native";

const CustomTextarea = ({ value, onChange, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        className={`border-[1px] ${isFocused ? "border-[#212121]" : "border-neutral-color-blue-gray-100"} rounded-[8px] font-roboto-regular h-[146px] bg-transparent text-[14px] ${isFocused ? "text-neutral-color-gray-900" : "text-[#90A4AE]"} p-3`}
        placeholderTextColor={isFocused ? "#212121" : "#90a3ae"}
        multiline={true}
        numberOfLines={7}
        maxLength={255}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Text
        className={`absolute bottom-2 right-3 text-[12px] ${isFocused ? "text-neutral-color-gray-900" : "text-neutral-color-blue-gray-300"}`}
      >
        {value.length}/255
      </Text>
    </View>
  );
};

export default CustomTextarea;
