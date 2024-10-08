import { View, Text } from "react-native";

const CustomChip = ({ label, status }) => {
  const chipStyle =
    status === "active" ? "bg-primarios-violeta-100" : "bg-white";

  const textStyle = status === "active" ? "text-white" : "text-neutros-negro";

  return (
    <View
      className={`w-content px-[12px] py-[6px] rounded-[28px] ${chipStyle}`}
    >
      <Text
        className={`${textStyle} font-roboto-medium text-[12px] justify-center items-center`}
      >
        {label}
      </Text>
    </View>
  );
};

export default CustomChip;
