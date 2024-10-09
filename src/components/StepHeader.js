import { View, Text } from "react-native";
import LogoDark from "./svgComponents/LogoDark";

const StepHeader = ({ title }) => {
  return (
    <View className="flex-1 w-full items-center py-8 border-b-[1px] border-b-neutral-color-blue-gray-100">
      <View>
        <LogoDark />
      </View>
      <View className="mt-[34px] w-[257px]">
        <Text className="font-roboto-light leading-10 text-[30px] text-center text-neutros-negro">
          {title}
        </Text>
      </View>
    </View>
  );
};

export default StepHeader;
