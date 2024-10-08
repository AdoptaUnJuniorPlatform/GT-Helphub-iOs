import { View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import StepLabel from "./StepLabel";

const Stepper = ({ step = "1" }) => {
  const progressPercentage = ((step - 1) / 4) * 100;

  const constrainedLeft = Math.min(Math.max(progressPercentage, 4), 96);

  const progressBarWidth = ((step - 1) / 4) * 100;

  return (
    <View className="pt-3">
      <View className="flex-row items-center">
        <StepLabel title="1" status="active" />
        <View className="relative h-[3px] flex-1">
          <View className="bg-neutral-color-blue-gray-50 h-[3px] flex-1"></View>
          <View
            className="bg-primarios-violeta-100 h-[3px] absolute"
            style={{ width: `${progressBarWidth}%` }}
          ></View>
        </View>
        <StepLabel title="2" status="inactive" />
      </View>
      <View
        className="absolute top-2 w-[32px] h-[32px] rounded-full bg-primarios-violeta-100 justify-center items-center"
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

export default Stepper;
