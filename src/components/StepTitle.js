import { View, Text } from "react-native";

const StepTitle = ({ title, subtitle }) => {
  return (
    <View className="h-auto">
      <Text className="text-primarios-violeta-100 text-[34px] font-roboto-medium mb-[5px]">
        {title}
      </Text>
      <Text
        className="text-[#7166D2] text-[16px] font-roboto-medium"
        style={{ opacity: 0.8 }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default StepTitle;
