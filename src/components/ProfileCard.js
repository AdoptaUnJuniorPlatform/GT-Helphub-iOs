import { useState, useEffect } from "react";
import { View, Modal, Pressable, Text, Image, ScrollView } from "react-native";
import { CustomButton } from "./CustomButton";
import { RatingCard } from "./RatingCard";
import { CustomRating } from "./CustomRating";
import { getScreenSize } from "../utils/screenSize";
import apiClient from "../api/apiClient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import DialogIcon from "./svgComponents/DialogIcon";
// import Entypo from "@expo/vector-icons/Entypo";

export const ProfileCard = ({ isCardVisible, toggleCard, data }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const userId = data.user_id;

  const [user, setUser] = useState({ nameUser: "", surnameUser: "" });
  const [profile, setProfile] = useState({
    profilePicture: null,
    description: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const fetchUser = async (userId) => {
    try {
      const response = await apiClient.get(`/user/user-id/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  const fetchProfile = async (userId) => {
    try {
      const response = await apiClient.get(`/profile/byUserId/${userId}`);
      setProfile(response.data);
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  const fetchImage = async (userId) => {
    try {
      const response = await apiClient.get(
        `/upload-service/profile-imageByUser/${userId}`,
        { responseType: "blob" },
      );
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage(imageUrl);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        //alert("Se ha producido un error, intenta de nuevo.");
      } else {
        console.error(error.message);
        //alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  useEffect(() => {
    fetchUser(userId);
    fetchProfile(userId);
    fetchImage(userId);
  }, [userId]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isCardVisible}
      onRequestClose={toggleCard}
    >
      <View
        style={{
          backgroundColor: "rgba(144, 145, 146, 0.6)",
        }}
        className="absolute w-full h-screen flex-1 justify-center px-4"
      >
        <View
          className="bg-white p-6 rounded-lg"
          style={{
            shadowColor: "#212121",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
          }}
        >
          <View className="w-full flex-row justify-end items-center mb-5">
            <Pressable onPress={toggleCard} className="self-end">
              <MaterialIcons name="close" size={14} color="#212121" />
            </Pressable>
          </View>

          <View className="flex-row justify-start items-center mb-5 gap-2 w-full">
            <View className="h-[124px] w-[120px] rounded-[10px]">
              {profileImage && (
                <Image
                  className="rounded-[10px]"
                  source={{ uri: profileImage }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              )}
            </View>
            <View className="h-[124px] py-4 justify-between">
              <Text className="font-roboto-medium text-xl text-neutros-negro">
                {user?.nameUser || ""} {user?.surnameUser || ""}
              </Text>
              <CustomRating rating={5} />
              <View>
                <Text className="font-roboto-medium text-sm text-neutros-negro">
                  Valoración general
                </Text>
                <Text className="font-roboto-regular text-xs text-neutros-negro-80">
                  3 reseñas
                </Text>
              </View>
            </View>
          </View>

          <View
            className="w-full rounded-[10px] pl-[11px] pr-[45px] py-3 mb-5 gap-[5px]"
            style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
          >
            <Text className="text-neutros-negro font-roboto-regular text-sm">
              Descripción
            </Text>
            <Text className="text-neutros-negro-80 font-roboto-regular text-xs">
              {profile?.description || ""}
            </Text>
          </View>

          <View className="mb-5 w-full">
            <Text className="text-neutral-color-gray-900 font-roboto-regular text-xl">
              Valoraciones
            </Text>
          </View>

          {/* <View
            className={`
            w-full mb-5 rounded-lg border-[1px] items-center justify-center border-neutral-color-blue-gray-100
            ${isBigScreen ? "py-[35px]" : isSmallScreen ? "py-[20px]" : "py-[30px]"} 
            `}
          >
            <View>
              <DialogIcon />
            </View>
            <Text className="text-neutros-negro font-roboto-medium text-lg my-3">
              Aún no hay valoraciones
            </Text>
            <Text className="text-neutros-negro-80 w-[65%] text-center font-roboto-regular text-sm">
              Comparte tu opinión y ayuda a que otros conozcan mejor a esta
              persona
            </Text>
          </View> */}

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <RatingCard />
              </View>
              <View>
                <RatingCard />
              </View>
              <View>
                <RatingCard />
              </View>
            </ScrollView>
          </View>

          <View className="w-[80%] self-center">
            <CustomButton
              onPress={() => console.log("enviar solicitud")}
              title={"Enviar solicitud de intercambio"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
