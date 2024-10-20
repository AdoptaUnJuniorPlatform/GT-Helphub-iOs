import { View, Text, TouchableOpacity, Image } from "react-native";

const RequestCard = ({ image, name, surname, message, pending }) => {
  return (
    <View className="flex-1 flex-row w-full p-5 bg-primarios-violeta-20 rounded-[6px] justify-between items-center mb-1">
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
            <Text className="mr-1 text-[20px] font-roboto-medium text-neutros-negro">
              {name}
            </Text>
            <Text className="text-[20px] font-roboto-medium text-neutros-negro">
              {surname}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="flex-row h-[36px] items-center justify-center rounded-[8px] bg-primarios-rosa-100 w-fit px-[16px]"
        onPress={() => console.log("ver perfil")}
      >
        <Text className="font-roboto-bold text-[12px] text-white">
          Ver Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestCard;
