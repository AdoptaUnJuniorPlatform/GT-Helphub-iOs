import { View, Text } from "react-native";
import LogoDark from "./svgComponents/LogoDark";

const StepHeader = ({ title, subtitle, full }) => {
  return (
    <View className="flex-1 w-full items-center py-8 border-b-[1px] border-b-neutral-color-blue-gray-100">
      <View>
        <LogoDark />
      </View>

      {title ? (
        <View className={`mt-[34px] ${full ? "w-full" : "w-[257px]"}`}>
          <Text className="font-roboto-light leading-10 text-[30px] text-center text-neutros-negro">
            {title}
          </Text>
        </View>
      ) : (
        <View />
      )}

      {subtitle ? (
        <View className="mt-[5px] w-full">
          <Text className="font-roboto-regular text-[14px] text-center text-neutros-negro">
            {subtitle}
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default StepHeader;
