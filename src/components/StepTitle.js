import { View, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const StepTitle = ({ title, subtitle }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <View className="h-auto">
      <Text
        className={`text-primarios-violeta-100 font-roboto-medium ${isBigScreen ? "text-[36px] mb-[6px]" : isSmallScreen ? "text-[30px] mb-[2px]" : "text-[34px] mb-[5px]"}`}
      >
        {title}
      </Text>
      <Text
        className={`text-[#7166D2] ${isBigScreen ? "text-[18px]" : "text-[16px]"} font-roboto-medium`}
        style={{ opacity: 0.8 }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default StepTitle;
