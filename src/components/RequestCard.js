import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import apiClient from "../api/apiClient";

export const RequestCard = ({ senderId, onPress }) => {
  const [sender, setSender] = useState({});
  const [senderImage, setSenderImage] = useState(null);

  const fetchUser = async (senderId) => {
    try {
      const response = await apiClient.get(`/user/user-id/${senderId}`);
      setSender(response.data);
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  const fetchImage = async (senderId) => {
    try {
      const response = await apiClient.get(
        `/upload-service/profile-imageByUser/${senderId}`,
        { responseType: "blob" },
      );
      const imageUrl = URL.createObjectURL(response.data);
      setSenderImage(imageUrl);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        alert("Se ha producido un error, intenta de nuevo.");
      } else {
        console.error(error.message);
        alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  useEffect(() => {
    fetchUser(senderId);
  }, []);

  useEffect(() => {
    fetchImage(senderId);
  }, []);

  return (
    <View className="flex-1 flex-row w-full p-5 bg-primarios-violeta-20 rounded-md justify-between items-center mb-1">
      <View className="flex-1 flex-row items-center">
        <View className="w-[59px] h-[59px] rounded-full mr-5">
          {senderImage && (
            <Image
              source={{ uri: senderImage }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
              className="rounded-full"
            />
          )}
        </View>
        <View className="w-2/3 overflow-ellipsis">
          <View className="w-full">
            <Text className="mr-1 text-xl font-roboto-medium text-neutros-negro">
              {sender.nameUser}
            </Text>
            <Text className="text-xl font-roboto-medium text-neutros-negro">
              {sender.surnameUser}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="flex-row h-[36px] items-center justify-center rounded-lg bg-primarios-rosa-100 w-fit px-4"
        onPress={onPress}
      >
        <Text className="font-roboto-medium uppercase text-xs text-white">
          Ver Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};
