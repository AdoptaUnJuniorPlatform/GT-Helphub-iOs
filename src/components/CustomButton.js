import { TouchableOpacity, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const CustomButton = ({
  onPress,
  title,
  width = "full",
  variant = "filled",
  isBackButton = false,
}) => {
  const getWidthStyle = () => (width === "full" ? "w-full" : "w-fit px-[16px]");
  const getButtonStyle = () =>
    variant === "filled"
      ? "bg-primarios-azul-100 shadow-md"
      : "bg-white border-[1px] border-primarios-celeste-100";
  const getTextStyle = () =>
    variant === "filled" ? "text-white" : "text-primarios-celeste-100";

  if (isBackButton) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="h-[36px] flex-row items-center justify-center rounded-[8px] pl-[8px] pr-[16px] border-[1px] border-neutros-negro-80"
      >
        <View className="mr-[8px]">
          <Feather name="chevron-left" size={20} color="#212121" />
        </View>
        <Text className="uppercase font-roboto-bold text-[12px] text-[#263238]">
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className={`h-[36px] items-center justify-center rounded-[8px] ${getWidthStyle()} ${getButtonStyle()}`}
      onPress={onPress}
    >
      <Text
        className={`font-roboto-bold text-[12px] uppercase ${getTextStyle()}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
