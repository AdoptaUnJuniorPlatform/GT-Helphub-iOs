import { TouchableOpacity, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const CustomButton = ({
  onPress,
  title,
  width = "full",
  variant = "purple",
  isBackButton = false,
}) => {
  const buttonWidth = width === "full" ? "w-full" : "w-fit px-[16px]";

  const buttonStyle =
    variant === "purple"
      ? "bg-primarios-celeste-100"
      : "bg-white border-[1px] border-neutral-color-blue-gray-300";

  const textStyle =
    variant === "purple" ? "text-white" : "text-primarios-celeste-100";

  if (isBackButton) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="h-[36px] flex-row items-center gap-[8px]"
      >
        <View>
          <Feather name="chevron-left" size={20} color="#212121" />
        </View>
        <Text className="uppercase font-bold text-[12px] text-[#263238]">
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className={`h-[36px] items-center justify-center rounded-[8px] ${buttonWidth} ${buttonStyle}`}
      onPress={onPress}
    >
      <Text className={`font-bold text-[12px] uppercase ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
