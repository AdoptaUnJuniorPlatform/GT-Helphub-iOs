/* eslint-disable prettier/prettier */
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const Checkbox = ({ isChecked, onPress, label, labelLink, onLinkPress }) => {
  return (
    <View className="flex-row items-start my-[34px]">
      <TouchableOpacity className="mr-2 mt-[1px]" onPress={onPress}>
        <View
          className={`w-[18px] h-[18px] border-[1px] rounded ${isChecked
            ? "bg-[#3F51B5] border-[#3F51B5]"
            : "bg-transparent border-neutral-color-blue-gray-100"
            } flex items-center justify-center`}
        >
          {isChecked && <Feather name="check" size={14} color="white" />}
        </View>
      </TouchableOpacity>

      <View className="flex-row flex-wrap">
        <Text className="text-neutral-color-blue-gray-400 font-poppins-medium text-[12px]">
          {label}
        </Text>

        {labelLink && onLinkPress && (
          <>
            <Text className="text-neutral-color-blue-gray-400 text-[12px]">
              {" "}
            </Text>
            <TouchableOpacity onPress={onLinkPress}>
              <Text className="font-medium text-[12px] text-neutral-color-gray-900">
                {labelLink}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Checkbox;
