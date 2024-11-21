import { TouchableOpacity, View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export const CustomCheckbox = ({
  isChecked,
  onPress,
  label,
  labelLink,
  onLinkPress,
}) => {
  return (
    <View className="flex-row items-center">
      <TouchableOpacity className="mr-2" onPress={onPress}>
        <View
          className={`
            w-[18px] h-[18px] border-[1px] rounded items-center justify-center
            ${isChecked ? "bg-[#3F51B5] border-[#3F51B5]" : "bg-transparent border-neutral-color-blue-gray-100"} 
            `}
        >
          {isChecked && <Feather name="check" size={14} color="white" />}
        </View>
      </TouchableOpacity>

      <View className="flex-row flex-wrap w-3/4">
        <Text className="text-neutros-negro-80 font-roboto-medium text-xs">
          {label}
        </Text>

        {labelLink && onLinkPress && (
          <>
            <Text className="text-neutral-color-blue-gray-400 text-xs"> </Text>
            <TouchableOpacity onPress={onLinkPress}>
              <Text className="font-roboto-medium underline text-xs text-neutral-color-gray-900">
                {labelLink}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};
