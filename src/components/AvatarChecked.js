import { View, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { getScreenSize } from "../utils/screenSize";

export const AvatarChecked = ({ source }) => {
  const { isSmallScreen } = getScreenSize();

  return (
    <View>
      <Image
        source={source}
        style={{
          width: isSmallScreen ? 50 : 74,
          height: isSmallScreen ? 50 : 74,
          borderRadius: isSmallScreen ? 50 : 60,
        }}
      />

      <View className="absolute -right-1 -top-1 bg-primarios-violeta-100 h-[22px] w-[22px] rounded-full border-[1px] border-white justify-center items-center">
        <Feather name="check" size={14} color="white" />
      </View>
    </View>
  );
};
