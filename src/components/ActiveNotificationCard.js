import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { fetchProfileImage } from "../api/apiCalls";
import apiClient from "../api/apiClient";

export const ActiveNotificationCard = ({ senderId, onProfilePress }) => {
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

  useEffect(() => {
    fetchUser(senderId);
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await fetchProfileImage(senderId);
        setSenderImage(imageUrl);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <View>
      {/* <Text className="text-right mb-3 text-[#777777] font-roboto-regular text-base">
        {time}
      </Text> */}
      <View className="px-[15px] py-3 bg-white border-[1px] border-[#e2e2e2] rounded-md justify-between items-start mb-3">
        <View className="flex-row items-center overflow-hidden">
          <View className="w-[50px] h-[50px] rounded-full mr-4">
            {senderImage && (
              <Image
                source={{ uri: senderImage }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                className="rounded-full"
              />
            )}
          </View>

          <Text className="font-roboto-regular text-neutros-negro text-sm">
            Nueva solicitud de intercambio
          </Text>
        </View>

        <Text className="mt-1 mb-5 font-roboto-400 text-xs text-neutros-negro">
          <Text className="text-primarios-violeta-100">
            {sender.nameUser} {sender.surnameUser}
          </Text>{" "}
          ha enviado una solicitud.
        </Text>

        <View className="flex-row self-end">
          <TouchableOpacity
            className="flex-row h-[36px] items-center justify-center rounded-lg bg-primarios-rosa-100 w-fit px-4"
            onPress={onProfilePress}
          >
            <Text className="font-roboto-medium uppercase text-xs text-white">
              Ver Perfil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
