import { View } from "react-native";
import { StepLabel } from "./StepLabel";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const Stepper = ({ step, statusStepLabel1, statusStepLabel2 }) => {
  const progressPercentage = ((step - 1) / 4) * 100;
  const constrainedLeft = Math.min(Math.max(progressPercentage, 4), 96);
  const progressBarWidth = ((step - 1) / 4) * 100;

  return (
    <View>
      <View className="flex-row items-center">
        <StepLabel title={step} status={statusStepLabel1} />
        <View className="relative h-[3px] flex-1">
          <View className="bg-neutral-color-blue-gray-50 h-[3px] flex-1"></View>
          <View
            className="bg-primarios-violeta-100 h-[3px] absolute"
            style={{ width: `${progressBarWidth}%` }}
          ></View>
        </View>
        <StepLabel title={parseInt(step) + 1} status={statusStepLabel2} />
      </View>
      <View
        className="absolute -top-1 w-[32px] h-[32px] rounded-full bg-primarios-violeta-100 justify-center items-center"
        style={{
          left: `${constrainedLeft}%`,
          transform: [{ translateX: -16 }],
        }}
      >
        <FontAwesome6 name="user-large" size={14} color="white" />
      </View>
    </View>
  );
};
