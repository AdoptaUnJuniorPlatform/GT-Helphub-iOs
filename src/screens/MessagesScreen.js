import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
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
import { getScreenSize } from "../utils/screenSize";
import { useUser } from "../user/UserContext";
import apiClient from "../api/apiClient";

const MessagesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Mensajes");

  const { isSmallScreen, isBigScreen } = getScreenSize();

  const { userData } = useUser();
  const user_id = userData?._id;

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isProfileVisible, setProfileVisible] = useState(false);

  const [messages, setMessages] = useState([]);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async (user_id) => {
    try {
      const response = await apiClient.get(
        `/exchange/findBy-reciever-progress/${user_id}`,
      );
      setRequests(response.data);
    } catch (error) {
      if (error.response) {
        // console.error(error.response.data.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      } else {
        // console.error(error.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  const fetchAccepted = async (user_id) => {
    try {
      const response = await apiClient.get(
        `/exchange/find-all-acepted/${user_id}`,
      );
      console.log("ACCEPTED DATA", response.data);
      setMessages(response.data);
    } catch (error) {
      if (error.response) {
        // console.error(error.response.data.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      } else {
        // console.error(error.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  const toggleProfile = (requestData) => {
    setSelectedRequest(requestData);
    setProfileVisible(!isProfileVisible);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRequests(user_id);
      fetchAccepted(user_id);
    }, []),
  );

  useEffect(() => {
    fetchRequests(user_id);
    fetchAccepted(user_id);
  }, [user_id]);

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
              Mensajes
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
              {messages.map((message, _id) => (
                <MessageCard
                  key={_id}
                  senderId={message.transmitter}
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
                  onPress={() => navigation.navigate("Inicio")}
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
              {requests.length > 0 &&
                requests.map((request, _id) => (
                  <RequestCard
                    key={_id}
                    senderId={request.transmitter}
                    onPress={() => toggleProfile(request)}
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
          requestData={selectedRequest}
          setRequests={setRequests}
          requests={requests}
        />
      )}
    </SafeAreaView>
  );
};

export default MessagesScreen;
