import { View, Text } from "react-native";

export const StepLabel = ({ status, title }) => {
  const labelStyle =
    status === "active"
      ? "bg-primarios-violeta-100"
      : "bg-neutral-color-blue-gray-100";

  return (
    <View
      className={`${labelStyle} w-[24px] h-[24px] rounded-full items-center justify-center`}
    >
      <Text className="text-white font-roboto-bold text-[12px]">{title}</Text>
    </View>
  );
};
