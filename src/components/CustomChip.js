import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const CustomChip = ({
  label,
  status,
  color = "purple",
  showBorder = false,
  iconName,
  onIconPress,
}) => {
  const isActive = status === "active";
  const chipStyle = isActive
    ? color === "purple"
      ? "bg-primarios-violeta-100"
      : "bg-primarios-azul-100"
    : `bg-transparent ${showBorder ? "border border-neutros-negro-50" : ""}`;

  const textStyle = isActive ? "text-white" : "text-neutros-negro";

  return (
    <View
      className={`flex-row w-content px-3 py-1.5 rounded-[28px] items-center ${chipStyle}`}
    >
      <Text className={`${textStyle} font-roboto-medium text-xs`}>{label}</Text>
      {isActive && iconName && (
        <TouchableOpacity onPress={onIconPress} style={{ marginLeft: 8 }}>
          <MaterialIcons name={iconName} size={13} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};
