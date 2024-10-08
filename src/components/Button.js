import { TouchableOpacity, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const Button = ({
  onPress,
  title,
  width = "full",
  variant = "purple",
  isBackButton = false,
}) => {
  const buttonWidth = width === "full" ? "w-full" : "w-auto px-[16px]";

  const buttonStyle =
    variant === "purple"
      ? "bg-primarios-celeste-100"
      : "bg-white border-[1px] neutral-color-blue-gray-300";

  const textStyle =
    variant === "purple" ? "text-white" : "text-primarios-celeste-100";

  if (isBackButton) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center gap-[8px] mt-12 w-auto"
      >
        <Feather name="chevron-left" size={20} color="#212121" />
        <Text className="uppercase font-roboto-bold text-[12px] text-[#263238]">
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

export default Button;
