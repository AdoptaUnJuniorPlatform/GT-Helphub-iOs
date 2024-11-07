import { View } from "react-native";
import { LogoDark } from "./svgComponents/LogoDark";
import { Stepper } from "./Stepper";
import { CustomChip } from "./CustomChip";
import { getScreenSize } from "../utils/screenSize";

export const StepHeader = ({
  step,
  statusStepLabel1,
  statusStepLabel2,
  label1,
  label2,
  status1,
  status2,
}) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  return (
    <View
      className={`
        h-[188px] mb-5 
        ${isBigScreen ? "mb-7" : isSmallScreen ? "mb-3" : "mb-5"}
        `}
    >
      <View className="flex-1 w-full items-center py-8">
        <LogoDark />
      </View>

      <View className="px-4">
        <Stepper
          step={step}
          statusStepLabel1={statusStepLabel1}
          statusStepLabel2={statusStepLabel2}
        />

        <View className="mt-5 w-full flex-row justify-between items-center">
          <CustomChip label={label1} status={status1} />
          <CustomChip label={label2} status={status2} />
        </View>
      </View>
    </View>
  );
};
