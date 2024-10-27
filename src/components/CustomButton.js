import { TouchableOpacity, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export const CustomButton = ({
  onPress,
  title,
  width = "full",
  variant = "filled",
  isBackButton = false,
  disabled = false,
  children,
}) => {
  const getWidthStyle = () => (width === "full" ? "w-full" : "w-fit px-[16px]");

  const getButtonStyle = () =>
    variant === "filled"
      ? "bg-primarios-azul-100"
      : "bg-transparent border-[1px]";

  const getTextStyle = () =>
    variant === "filled" ? "text-white" : "text-primarios-celeste-100";

  const shadowStyle =
    variant === "filled"
      ? {
        shadowColor: "#212121",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      }
      : {};

  if (isBackButton) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="h-[36px] flex-row items-center justify-center rounded-lg pl-2 pr-4 border-[1px] border-neutros-negro-80"
      >
        <View className="mr-2">
          <Feather name="chevron-left" size={20} color="#696868" />
        </View>
        <Text className="uppercase font-roboto-bold text-xs text-neutros-negro-80">
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  const disabledStyle = disabled
    ? { borderColor: "#b8b8b8" }
    : { borderColor: "#496ceb" };
  const disabledText = disabled ? { color: "#b8b8b8" } : {};

  return (
    <TouchableOpacity
      className={`flex-row h-[36px] items-center justify-center rounded-lg ${getWidthStyle()} ${getButtonStyle()}`}
      onPress={disabled ? null : onPress}
      style={[shadowStyle, disabledStyle]}
      disabled={disabled}
    >
      {children}
      <Text
        className={`font-roboto-bold text-xs uppercase ${getTextStyle()}`}
        style={disabledText}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
