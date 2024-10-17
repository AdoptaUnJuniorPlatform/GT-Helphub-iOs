import { View, Dimensions } from "react-native";
import LogoDark from "./svgComponents/LogoDark";
import Stepper from "./Stepper";
import CustomChip from "./CustomChip";

const { width } = Dimensions.get("window");

const StepHeader = ({ step, label1, label2, status1, status2 }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <View
      className={`h-[188px] mb-5 ${isBigScreen ? "mb-7" : isSmallScreen ? "mb-3" : "mb-5"}`}
    >
      <View className="flex-1 w-full items-center py-8">
        <LogoDark />
      </View>

      <View className="px-4">
        <Stepper step={step} />

        <View className="mt-[20px] w-full flex-row justify-between items-center">
          <CustomChip label={label1} status={status1} />
          <CustomChip label={label2} status={status2} />
        </View>
      </View>
    </View>
  );
};

export default StepHeader;
