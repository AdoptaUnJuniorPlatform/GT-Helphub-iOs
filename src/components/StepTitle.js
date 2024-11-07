import { View, Text } from "react-native";
import { getScreenSize } from "../utils/screenSize";

export const StepTitle = ({ title, subtitle }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  return (
    <View className="h-auto">
      <Text
        className={`
          text-primarios-violeta-100 font-roboto-medium 
          ${isBigScreen ? "text-[36px] mb-1.5" : isSmallScreen ? "text-[30px] mb-0.5" : "text-[34px] mb-[5px]"}
          `}
      >
        {title}
      </Text>
      <Text
        className={`
          text-[#7166D2] font-roboto-medium
          ${isBigScreen ? "text-xs" : "text-base"}
          `}
        style={{ opacity: 0.8 }}
      >
        {subtitle}
      </Text>
    </View>
  );
};
