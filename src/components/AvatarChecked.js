import { View, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const AvatarChecked = ({ source }) => {
  return (
    <View>
      <Image source={source} />
      <View className="absolute -right-1 -top-1 bg-primarios-violeta-100 h-[22px] w-[22px] rounded-full border-[1px] border-white justify-center items-center">
        <Feather name="check" size={14} color="white" />
      </View>
    </View>
  );
};

export default AvatarChecked;
