import { View } from "react-native";
import LogoDark from "./svgComponents/LogoDark";

const StepHeader = () => {
  return (
    <View className="flex-1 w-full items-center py-8">
      <View>
        <LogoDark />
      </View>
    </View>
  );
};

export default StepHeader;
