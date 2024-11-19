import { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity, Text, Image } from "react-native";
import { CustomButton } from "./CustomButton";
import { VerifiedIcon } from "../components/svgComponents/VerifiedIcon";
import { CustomChip } from "./CustomChip";
import { CustomRating } from "../components/CustomRating";
import { getScreenSize } from "../utils/screenSize";
import apiClient from "../api/apiClient";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const MessagesProfile = ({
  onRequestClose,
  visible,
  navigation,
  requestData,
  requests,
  setRequests,
}) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const senderId = requestData?.transmitter;
  const exchangeId = requestData?._id;

  const [sender, setSender] = useState({});
  const [senderImage, setSenderImage] = useState(null);
  const [senderProfile, setSenderProfile] = useState({});
  const [activeAbilities, setActiveAbilities] = useState([]);

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

  const fetchProfile = async (senderId) => {
    try {
      const response = await apiClient.get(`/profile/byUserId/${senderId}`);
      setSenderProfile(response.data);
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  const fetchActiveAbilities = async (senderId) => {
    try {
      const response = await apiClient.get(
        `/hability/user-habilities/${senderId}`,
      );
      setActiveAbilities(response.data);
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  useEffect(() => {
    fetchUser(senderId);
    fetchImage(senderId);
    fetchProfile(senderId);
    fetchActiveAbilities(senderId);
  }, []);

  const declineExchange = async (exchangeId) => {
    const payload = {
      state: "declined",
    };
    try {
      await apiClient.patch(`/exchange/${exchangeId}`, payload);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== exchangeId),
      );
      alert("¡Intercambio declinado!");
      onRequestClose();
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  const acceptExchange = async (exchangeId) => {
    const payload = {
      state: "accepted",
    };
    try {
      await apiClient.patch(`/exchange/${exchangeId}`, payload);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== exchangeId),
      );
      alert("¡Intercambio aceptado!");
      onRequestClose();
      goToMessagesFlow();
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  const goToMessagesFlow = () => {
    onRequestClose();
    navigation.navigate("MessagesFlow", { screen: "MessagesStep1" });
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View
        className={`
          absolute w-full h-screen flex-1 justify-center bg-neutros-gris-fondo
          ${isSmallScreen ? "pt-6" : "pt-16"}
          `}
      >
        <View className="flex-1 w-full justify-between">
          <View>
            {/* Go Back Button */}
            <View className="bg-neutros-gris-fondo w-full pt-2 pb-6 flex-row justify-start items-center">
              <TouchableOpacity
                onPress={onRequestClose}
                className={`
                  ${isBigScreen ? "h-[42px]" : isSmallScreen ? "h-[28px]" : "h-[36px]"} 
                  flex-row items-center justify-center pl-2 pr-4
                  `}
              >
                <View className="mr-2">
                  <Feather
                    name="chevron-left"
                    size={isSmallScreen ? 24 : 28}
                    color="#696868"
                  />
                </View>
                <Text
                  className={`
                    font-roboto-medium ${isSmallScreen ? "text-xl" : "text-[22px]"} 
                    text-neutros-negro
                    `}
                >
                  Perfil de usuario
                </Text>
              </TouchableOpacity>
            </View>

            {/* Image Section */}
            <View
              className={`
            flex-row justify-start items-center gap-2 w-full px-4
            ${isSmallScreen ? "mb-2" : "mb-5"}
            `}
            >
              <View className="h-[124px] w-[120px] rounded-[10px] mr-1">
                {senderImage && (
                  <Image
                    source={{ uri: senderImage }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                    className="rounded-[10px]"
                  />
                )}
              </View>
              <View className="h-[124px] py-4 justify-between">
                <View className="flex-row">
                  <Text className="mr-2 font-roboto-medium text-xl text-neutros-negro">
                    {sender.nameUser} {sender.surnameUser}
                  </Text>
                  <VerifiedIcon />
                </View>
                <CustomRating rating={4} />
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

            {/* Intercambiar... */}
            <View className="items-start justify-between mx-8">
              <Text
                className={`
                  font-roboto-medium text-sm text-neutros-negro 
                  ${isSmallScreen ? "" : "mb-2"}
                  `}
              >
                Intercambiar habilidades:
              </Text>
              <View className="flex-row items-center">
                <View className="flex-row w-content py-1 px-2 rounded-full items-center bg-transparent border-[1px] border-neutros-negro-80">
                  <Text className="font-roboto-regular text-xs text-neutros-negro-80">
                    Informática
                  </Text>
                </View>
                <View className="mx-1">
                  <FontAwesome6
                    name="arrows-rotate"
                    size={17}
                    color="#696868"
                  />
                </View>
                <View className="flex-row w-content py-1 px-2 rounded-full items-center bg-transparent border-[1px] border-neutros-negro-80">
                  <Text className="font-roboto-regular text-xs text-neutros-negro-80">
                    Inglés
                  </Text>
                </View>
              </View>
            </View>

            {/* Habilidad... */}
            <View
              className={`
              mx-4 
              ${isSmallScreen ? "mt-2" : "mt-4"}
              `}
            >
              <Text
                className={`
                  text-neutral-color-gray-900 font-roboto-medium 
                  ${isSmallScreen ? "text-base mb-1" : "text-xl mb-2"}
                  `}
              >
                Habilidad intercambiada
              </Text>

              {activeAbilities.map((ability) => (
                <View
                  key={ability.description}
                  className={`
                                  rounded-[10px] pl-[11px] pr-[45px] py-3 
                                  ${isSmallScreen ? "mb-2" : "mb-4"}
                                  `}
                  style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
                >
                  <Text className="text-neutros-negro font-roboto-regular text-sm mb-[5px]">
                    {ability.title}
                  </Text>
                  <Text className="text-neutros-negro-80 font-roboto-regular text-xs">
                    {ability.description}
                  </Text>
                </View>
              ))}
            </View>

            {/* Sobre mí */}
            <View className="mx-4">
              <Text
                className={`
                  text-neutral-color-gray-900 font-roboto-medium 
                  ${isSmallScreen ? "text-base mb-1" : "text-xl mb-2"}
                  `}
              >
                Sobre mí
              </Text>
              <View
                className={`
                  rounded-[10px] pl-[11px] pr-[45px] py-3 
                  ${isSmallScreen ? "mb-1" : "mb-4"}
                  `}
                style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
              >
                <Text className="text-neutros-negro-80 font-roboto-regular text-xs">
                  {senderProfile.description}
                </Text>
              </View>
            </View>

            {/* Disponibilidad */}
            <View className="flex-row mx-8 justify-between items-center">
              <Text className="font-roboto-regular text-neutros-negro text-sm">
                Disponibilidad
              </Text>
              <View className="border-[1px] border-neutros-negro-6 rounded-lg py-1.5 px-4">
                <Text className="font-roboto-medium text-neutros-negro text-sm">
                  {senderProfile.preferredTimeRange}
                </Text>
              </View>
            </View>

            {/* Habilidades activas */}
            <View
              className={`
              mx-4 
              ${isSmallScreen ? "mt-2 mb-2" : "mt-4"}
              `}
            >
              <Text
                className={`
                  text-neutral-color-gray-900 font-roboto-medium 
                  ${isSmallScreen ? "text-base mb-1" : "text-xl mb-2"}
                  `}
              >
                Habilidades activas
              </Text>
              <View className="flex-row gap-2">
                {activeAbilities.map((ability) => (
                  <View>
                    <CustomChip
                      key={ability.description}
                      label={ability.category}
                      status={"inactive"}
                      showBorder
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View>
            {/* Separator */}
            <View
              className={`
                ${isSmallScreen ? "" : "mb-2"} 
                border-b-[1px] border-b-neutral-color-blue-gray-50
                `}
            ></View>

            {/* Decline or Accept */}
            <View
              className={`
              mx-4 mt-2
              ${isSmallScreen ? "mb-2" : "mb-10"} 
              `}
            >
              <View className="flex-row justify-end">
                <View className="mr-2">
                  <TouchableOpacity
                    onPress={() => declineExchange(exchangeId)}
                    className="bg-transparent h-[36px] flex-row items-center justify-center rounded-lg px-4 border-[1px] border-neutros-negro-80"
                  >
                    <Text className="uppercase font-roboto-medium text-xs text-neutros-negro-80">
                      Declinar
                    </Text>
                  </TouchableOpacity>
                </View>
                <CustomButton
                  onPress={() => acceptExchange(exchangeId)}
                  title={"Aceptar intercambio"}
                  width="content"
                  variant="filled"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
