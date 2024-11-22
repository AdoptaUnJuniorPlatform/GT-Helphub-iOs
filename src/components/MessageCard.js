import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { fetchProfileImage } from "../api/apiCalls";
import apiClient from "../api/apiClient";

export const MessageCard = ({ senderId, onPress }) => {
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
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex-row w-full p-5 bg-[#f4f4f4] rounded-md justify-between items-center mb-1"
    >
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
          <View className="flex-row w-full">
            <Text className="mr-1 text-xl font-roboto-medium text-neutros-negro">
              {sender.nameUser}
            </Text>
            <Text className="text-xl font-roboto-medium text-neutros-negro">
              {sender.surnameUser}
            </Text>
          </View>
          {/* <Text className="text-[15px] font-roboto-regular text-neutros-negro-80 w-full"></Text> */}
        </View>
      </View>

      {/* TODO: Will be implemented later */}
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
