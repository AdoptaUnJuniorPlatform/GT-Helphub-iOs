import { TouchableOpacity, View, Text } from "react-native";

const CustomRadio = ({ isSelected, label, onPress }) => {
  return (
    <TouchableOpacity
      className={`h-[46px] flex-row items-center justify-start pl-2 border-[1px] rounded-[5px] ${isSelected ? "border-primarios-celeste-100" : "border-neutros-negro-50"}`}
      onPress={onPress}
    >
      <View className="mr-1 mt-[1px]">
        <View className="w-[18px] h-[18px] border-[1px] items-center justify-center border-neutral-color-blue-gray-100 rounded-full bg-white">
          <View
            className={`w-[14px] h-[14px] rounded-full ${isSelected ? "bg-[#2196f3]" : "bg-transparent"} `}
          ></View>
        </View>
      </View>

      <View className="flex-row flex-wrap">
        <Text
          className={`font-poppins-medium text-[14px] ${isSelected ? "text-primarios-celeste-100" : "text-neutros-negro "}`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomRadio;