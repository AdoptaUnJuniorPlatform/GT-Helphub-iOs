import { View, Text, TouchableOpacity, Image } from "react-native";

export const RequestCard = ({ image, name, surname, onPress }) => {
  return (
    <View className="flex-1 flex-row w-full p-5 bg-primarios-violeta-20 rounded-md justify-between items-center mb-1">
      <View className="flex-1 flex-row items-center">
        <View className="w-[59px] h-[59px] rounded-full mr-5">
          <Image
            source={image}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View className="w-2/3 overflow-ellipsis">
          <View className="mb-2 w-full">
            <Text className="mr-1 text-xl font-roboto-medium text-neutros-negro">
              {name}
            </Text>
            <Text className="text-xl font-roboto-medium text-neutros-negro">
              {surname}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="flex-row h-[36px] items-center justify-center rounded-lg bg-primarios-rosa-100 w-fit px-4"
        onPress={onPress}
      >
        <Text className="font-roboto-bold text-xs text-white">Ver Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};
