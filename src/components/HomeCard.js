import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import { CustomChip } from "./CustomChip";
import { CustomButton } from "./CustomButton";
import { getScreenSize } from "../utils/screenSize";
import { ScrollView } from "react-native-gesture-handler";
import { useProfile } from "../profile/ProfileContext";
import { formatDateHyphen } from "../utils/formatDate";
import apiClient from "../api/apiClient";

export const HomeCard = ({ onPress, data }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const { profileData } = useProfile();

  const userId = data?.user_id;

  const [profileImage, setProfileImage] = useState(null);

  const [user, setUser] = useState({ nameUser: "", surnameUser: "" });
  const [profile, setProfile] = useState({
    profilePicture: null,
    preferredTimeRange: "",
  });

  const [isRequestSent, setIsRequestSent] = useState(false);

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
        alert("Se ha producido un error, intenta de nuevo.");
      } else {
        console.error(error.message);
        alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  const createExchange = async () => {
    if (isRequestSent) return;
    setIsRequestSent(true);

    const payload = {
      transmitter: profileData.userId._id,
      reciever: userId,
      state: "progress",
      date: formatDateHyphen(),
    };
    try {
      await apiClient.post("/exchange", payload);
      alert("¡Intercambio solicitado con éxito!");
    } catch (error) {
      if (error.response && error.response.status === 406) {
        alert("¡Solicitud de intercambio ya existe!");
      } else {
        console.error(error.message);
        alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser(userId);
      fetchProfile(userId);
      fetchImage(userId);
    }, []),
  );

  return (
    <View
      className={`${isBigScreen ? "w-[325px] py-5" : isSmallScreen ? "w-[300px] py-4" : "w-[307px] py-5"} mr-4 rounded-[6px] bg-neutros-blanco mb-2 ml-2`}
      style={{
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowColor: "#000000",
      }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-[25px] px-5">
        <View className="w-[59px] h-[59px] rounded-full">
          {profileImage && (
            <Image
              className="rounded-full"
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          )}
        </View>
        <Text
          className={`
            text-neutros-negro font-roboto-medium
            ${isSmallScreen ? "text-lg" : "text-xl"}
            `}
        >
          {user?.nameUser || ""} {user?.surnameUser || ""}
        </Text>
      </View>

      {/* Subheader */}
      <View
        className={`
          ${isBigScreen ? "mt-10" : isSmallScreen ? "mt-4" : "mt-8"}
          px-5
          `}
      >
        <Text
          className={`
            font-roboto-regular text-neutros-negro
            ${isSmallScreen ? "text-lg" : "text-xl"}
            `}
        >
          {data?.title || ""}
        </Text>
      </View>

      {/* Direction */}
      <View
        className={`
          px-4 
          ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-4"}
          `}
      >
        <Text className="font-roboto-regular text-sm text-neutros-negro">
          {data?.mode === "Online" ? data?.mode : profile?.location}
        </Text>
      </View>

      {/* Separator */}
      <View
        className={`
          border-b-[0.3px] border-b-neutral-color-blue-gray-50 
          ${isBigScreen ? "mt-3 mb-4" : isSmallScreen ? "mt-2 mb-2" : "mt-2 mb-3"}
          `}
      ></View>

      {/* Level */}
      <View className="flex-row w-content gap-2 px-4">
        {data?.level === "Básico" ? (
          <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
            <Text
              className={`
              font-roboto-regular text-white 
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              `}
            >
              Básico
            </Text>
          </View>
        ) : (
          <View className="flex-row w-content px-[11px] rounded-full items-center bg-neutral-color-blue-gray-50">
            <Text
              className={`
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              font-roboto-regular text-neutros-negro-80
              `}
            >
              Básico
            </Text>
          </View>
        )}

        {data?.level === "Medio" ? (
          <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
            <Text
              className={`
          font-roboto-regular text-white 
          ${isSmallScreen ? "text-[10px]" : "text-xs"}
          `}
            >
              Medio
            </Text>
          </View>
        ) : (
          <View className="flex-row w-content px-[11px] rounded-full items-center bg-neutral-color-blue-gray-50">
            <Text
              className={`
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              font-roboto-regular text-neutros-negro-80
              `}
            >
              Medio
            </Text>
          </View>
        )}

        {data?.level === "Avanzado" ? (
          <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
            <Text
              className={`
              font-roboto-regular text-white 
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              `}
            >
              Avanzado
            </Text>
          </View>
        ) : (
          <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-neutral-color-blue-gray-50">
            <Text
              className={`
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              text-neutros-negro-80 font-roboto-regular
              `}
            >
              Avanzado
            </Text>
          </View>
        )}
      </View>

      {/* Availability */}
      <View
        className={`
          flex-row items-center justify-between px-4 
          ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-5"}
          `}
      >
        <Text className="font-roboto-regular text-sm text-neutros-negro">
          Disponibilidad
        </Text>
        <View className="border-[0.3px] border-neutral-color-blue-gray-50 h-[32px] w-fit justify-center px-4 rounded-md">
          <Text
            className={`
              font-roboto-medium text-neutros-negro
              ${isSmallScreen ? "text-xs" : "text-sm"}
              `}
          >
            {profile?.preferredTimeRange || ""}
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <ScrollView showsVerticalScrollIndicator={false} className="max-h-[50px]">
        <Text className="my-2 px-4 text-neutros-negro-80 text-sm font-roboto-regular">
          {data?.description || ""}
        </Text>
      </ScrollView>

      {/* Separator */}
      <View
        className={`
          border-b-[0.3px] border-b-neutral-color-blue-gray-50 
          ${isBigScreen ? "mt-2 mb-4" : isSmallScreen ? "mt-0 mb-2" : "mt-1 mb-3"}
          `}
      ></View>

      {/* Categories */}
      <View className="flex-row gap-2 px-4">
        <View>
          <CustomChip
            label={data?.category || ""}
            status={"inactive"}
            showBorder
          />
        </View>
      </View>

      {/* Separator */}
      <View
        className={`
          border-b-[0.3px] border-b-neutral-color-blue-gray-50 
          ${isBigScreen ? "my-4" : isSmallScreen ? "my-2" : "my-3"}
          `}
      ></View>

      {/* Button Set */}
      <View className="flex-1 flex-row justify-between px-4">
        <View>
          <CustomButton
            onPress={onPress}
            title={"Ver más"}
            variant="white"
            width="content"
          />
        </View>
        <View>
          <CustomButton
            onPress={createExchange}
            title={"Solicitar intercambio"}
            variant="filled"
            width="content"
            disabled={isRequestSent}
          />
        </View>
      </View>
    </View>
  );
};
