import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  MessageCard,
  RequestCard,
  MessagesProfile,
  AlertIcon,
} from "../components";

const { width } = Dimensions.get("window");

const MessagesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Mensajes");
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [isProfileVisible, setProfileVisible] = useState(false);

  const messages = [
    {
      id: 1,
      image: require("../../assets/avatar7.png"),
      name: "Lidia",
      surname: "Soriano",
      message: "Muchas Gracias",
      pending: "0",
    },
    {
      id: 2,
      image: require("../../assets/avatar8.png"),
      name: "Elsa",
      surname: "Landó",
      message: "No lo sé",
      pending: "2",
    },
    {
      id: 3,
      image: require("../../assets/avatar9.png"),
      name: "Estela",
      surname: "Naiad",
      message: "Puedes?",
      pending: "2",
    },
    {
      id: 4,
      image: require("../../assets/avatar10.png"),
      name: "Andrés",
      surname: "Castro",
      message: "Hola!",
      pending: "1",
    },
    {
      id: 5,
      image: require("../../assets/avatar10.png"),
      name: "Sirius",
      surname: "Black",
      message: "Qué tal?",
      pending: "2",
    },
  ];

  const requests = [
    {
      id: 1,
      image: require("../../assets/avatar12.png"),
      name: "Melania",
      surname: "Pino",
    },
    {
      id: 2,
      image: require("../../assets/avatar8.png"),
      name: "Melania",
      surname: "Pino",
    },
  ];

  // const messages = [];
  // const requests = [];

  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="absolute w-full h-screen flex-1 justify-center bg-neutros-gris-fondo">
        <View className="bg-neutros-gris-fondo w-full py-2 flex-row justify-start items-center">
          <View
            className={`
              ${isBigScreen ? "h-[42px]" : isSmallScreen ? "h-[30px]" : "h-[36px]"} 
              flex-row items-center justify-center px-8
              `}
          >
            <Text
              className={`
                font-roboto-medium text-neutros-negro 
                ${isSmallScreen ? "text-xl" : "text-[22px]"}
                `}
            >
              Bandeja de mensajes
            </Text>
          </View>
        </View>

        <View className="w-full flex-row justify-between items-center mt-2 px-6">
          <TouchableOpacity
            onPress={() => setActiveTab("Mensajes")}
            className={`
              flex-row items-center py-4 border-b-[1px] 
              ${activeTab === "Mensajes" ? "border-primarios-violeta-100" : "border-white"}
              `}
          >
            <Text className="font-roboto-medium text-base text-neutros-negro-80">
              Activos
            </Text>

            {messages.length > 0 && (
              <View className="bg-primarios-violeta-100 rounded-full w-[23px] h-[23px] items-center justify-center ml-2">
                <Text className="text-white text-sm font-roboto-medium">
                  {messages.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("Solicitudes")}
            className={`
              flex-row items-center py-4 border-b-[1px] 
              ${activeTab === "Solicitudes" ? "border-primarios-violeta-100" : "border-white"}
              `}
          >
            <Text className="font-roboto-medium text-base text-neutros-negro-80">
              Solicitudes
            </Text>

            {requests.length > 0 && (
              <View className="bg-primarios-rosa-100 rounded-full w-[23px] h-[23px] items-center justify-center ml-2">
                <Text className="text-white text-sm font-roboto-medium">
                  {requests.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === "Mensajes" && (
            <View className="p-4 pt-4">
              {messages.map((message, index) => (
                <MessageCard
                  key={index}
                  image={message.image}
                  name={message.name}
                  surname={message.surname}
                  message={message.message}
                  pending={message.pending}
                  onPress={() =>
                    navigation.navigate("MessagesFlow", {
                      screen: "MessagesStep1",
                    })
                  }
                />
              ))}
            </View>
          )}

          {activeTab === "Mensajes" && messages.length === 0 && (
            <View className="flex-1 px-6 pb-6 mt-2">
              <Text className="text-neutros-negro text-xl font-roboto-medium">
                Chats
              </Text>
              <View className="flex-1 h-full items-center justify-center mt-[180px]">
                <AlertIcon />
                <Text className="text-neutros-negro text-base font-roboto-regular mt-1 mb-2">
                  Sin conversaciones
                </Text>
                <Text className="text-neutros-negro-50 text-sm font-roboto-medium">
                  No hay conversaciones
                </Text>
                <TouchableOpacity
                  className="flex-row h-[36px] mt-6 items-center justify-center rounded-[5px] bg-transparent w-fit px-4 border-[1px] border-neutros-negro-80"
                  onPress={() => console.log("ver perfil")}
                >
                  <Text className="font-roboto-bold text-sm text-neutros-negro-80">
                    Buscar intercambio
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {activeTab === "Solicitudes" && (
            <View className="p-4">
              {requests.map((request, index) => (
                <RequestCard
                  key={index}
                  image={request.image}
                  name={request.name}
                  surname={request.surname}
                  onPress={toggleProfile}
                />
              ))}
            </View>
          )}

          {activeTab === "Solicitudes" && requests.length === 0 && (
            <View className="flex-1 px-6 pb-6">
              <Text className="text-neutros-negro text-xl font-roboto-medium">
                Chats
              </Text>
              <View
                className={`
                  flex-1 h-full items-center justify-center 
                  ${isSmallScreen ? "mt-[120px]" : "mt-[180px]"}
                  `}
              >
                <AlertIcon />
                <Text className="text-neutros-negro text-base font-roboto-regular mt-1 mb-2">
                  Sin solicitudes pendientes
                </Text>
                <Text className="text-neutros-negro-50 text-sm font-roboto-medium">
                  No hay conversaciones
                </Text>
                <TouchableOpacity
                  className="flex-row h-[36px] mt-6 items-center justify-center rounded-[5px] bg-transparent w-fit px-4 border-[1px] border-neutros-negro-80"
                  onPress={() => console.log("ver perfil")}
                >
                  <Text className="font-roboto-bold text-sm text-neutros-negro-80">
                    Buscar intercambio
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {isProfileVisible && (
        <MessagesProfile
          visible={isProfileVisible}
          onRequestClose={toggleProfile}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

export default MessagesScreen;
