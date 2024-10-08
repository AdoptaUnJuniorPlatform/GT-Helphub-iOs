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
  return (
    <View className="gap-2 mb-4">
      <Text className="text-neutral-color-blue-gray-900 font-poppins-medium text-[14px]">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className={`border-[1px] border-neutral-color-blue-gray-100 rounded-[8px] h-[40px] ${backgroundColor} font-roboto-regular text-[14px] text-[#90A4AE] p-3`}
        placeholderTextColor="neutral-color-blue-gray-300"
      />
    </View>
  );
};

export default InputField;
