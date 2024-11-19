import { View, Text, Image, TouchableOpacity } from "react-native";

export const MessageCard = ({ senderId, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex-row w-full p-5 bg-[#f4f4f4] rounded-md justify-between items-center mb-1"
    >
      <View className="flex-1 flex-row items-center">
        <View className="w-[59px] h-[59px] rounded-full mr-5">
          {/* <Image
            source={image}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          /> */}
        </View>
        <View className="w-2/3 overflow-ellipsis">
          <View className="flex-row mb-2 w-full">
            <Text className="mr-1 text-xl font-roboto-medium text-neutros-negro"></Text>
            <Text className="text-xl font-roboto-medium text-neutros-negro"></Text>
          </View>
          <Text className="text-[15px] font-roboto-regular text-neutros-negro-80 w-full"></Text>
        </View>
      </View>
      {/* {pending > 0 && (
        <View className="bg-primarios-violeta-100 rounded-[20px] w-[35px] h-[23px] items-center justify-center">
          <Text className="text-white text-[14px] font-roboto-medium">
            {pending}
          </Text>
        </View>
      )} */}
    </TouchableOpacity>
  );
};
