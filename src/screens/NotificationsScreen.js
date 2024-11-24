import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  MessagesProfile,
  ActiveNotificationCard,
  DeclinedNotificationCard,
  AlertDialogIcon,
  RatingsDialog,
} from "../components";
import { getScreenSize } from "../utils/screenSize";
import { useUser } from "../user/UserContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import apiClient from "../api/apiClient";

const NotificationsScreen = ({ navigation }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const { userData } = useUser();
  const user_id = userData?._id;

  const [activeTab, setActiveTab] = useState("Activos");
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [hasDialogShown, setHasDialogShown] = useState(false);
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isRatingsDialogVisible, setIsRatingsDialogVisible] = useState(false);

  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  const toggleRatingsDialog = () => {
    setIsRatingsDialogVisible(!isRatingsDialogVisible);
  };

  const completed = [
    // {
    //   id: 1,
    //   image: require("../../assets/avatar19.png"),
    //   name: "Laura",
    //   surname: "González",
    //   time: "12:44",
    //   status: "completed",
    // },
  ];

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // const active = [...completed, ...requests];

  const [declined, setDeclined] = useState([]);

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

  const fetchDeclined = async (user_id) => {
    try {
      const response = await apiClient.get(
        `/exchange/findBy-all-declined/${user_id}`,
      );
      setDeclined(response.data);
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

  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "pm" && hours < 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  // const sortedActive = [...completed, ...requests].sort(
  //   (a, b) => parseTime(b.time) - parseTime(a.time),
  // );

  const sortedRequests = [...requests].sort(
    (a, b) => parseTime(b.time) - parseTime(a.time),
  );

  const sortedDeclined = [...declined].sort(
    (a, b) => parseTime(b.time) - parseTime(a.time),
  );

  useEffect(() => {
    fetchRequests(user_id);
    fetchDeclined(user_id);
  }, [requests, declined]);

  useFocusEffect(
    React.useCallback(() => {
      setHasDialogShown(false);
    }, []),
  );

  useEffect(() => {
    if (activeTab === "Activos" && requests.length === 0 && !hasDialogShown) {
      setDialogVisible(true);
      setHasDialogShown(true);
    }
  }, [activeTab, requests, hasDialogShown]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "Activos") {
      setHasDialogShown(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="absolute w-full h-screen flex-1 justify-center bg-neutros-gris-fondo">
        <View className="bg-neutros-gris-fondo border-b-[1px] border-neutros-negro-80 w-full py-2 flex-row justify-start items-center">
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
              Notificaciones
            </Text>
          </View>
        </View>

        <View className="w-full flex-row justify-between items-center mt-2 px-6">
          <TouchableOpacity
            onPress={() => handleTabChange("Activos")}
            className="flex-row items-center py-4"
          >
            <Text className="font-roboto-medium text-[16px] text-neutros-negro-80">
              Activos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabChange("Declinados")}
            className="flex-row items-center py-4"
          >
            <Text className="font-roboto-medium text-base text-neutros-negro-80">
              Declinados
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === "Activos" && (
            <View className="p-4 pt-4">
              {sortedRequests.map((request) => (
                <ActiveNotificationCard
                  key={request._id}
                  senderId={request.transmitter}
                  onProfilePress={() => toggleProfile(request)}
                />
              ))}
            </View>
          )}

          {requests.length === 0 && declined.length === 0 && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={isDialogVisible}
              onRequestClose={toggleDialog}
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
                    <Pressable onPress={toggleDialog} className="self-end">
                      <MaterialIcons name="close" size={14} color="#212121" />
                    </Pressable>
                  </View>

                  <View className="my-8 w-full">
                    <Text className="text-neutros-negro font-roboto-medium text-[32px] text-center">
                      Notificaciones
                    </Text>
                  </View>

                  <View
                    className={`
                      w-full mb-5 rounded-lg border-[1px] items-center justify-center border-neutral-color-blue-gray-100
                      ${isBigScreen ? "py-[100px]" : isSmallScreen ? "py-[30px]" : "py-[80px]"} 
                      `}
                  >
                    <View className="mb-4">
                      <AlertDialogIcon />
                    </View>
                    <Text className="text-neutros-negro font-roboto-medium text-lg my-3">
                      Aún no hay notificaciones
                    </Text>
                    <Text className="text-neutros-negro-80 w-[65%] text-center font-roboto-regular text-sm">
                      De momento no tienes ninguna notificación.
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {activeTab === "Declinados" && (
            <View className="p-4">
              {sortedDeclined.map((request) => (
                <DeclinedNotificationCard
                  key={request._id}
                  senderId={request.transmitter}
                  onProfilePress={() => toggleProfile(request)}
                />
              ))}
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

      {isRatingsDialogVisible && (
        <RatingsDialog
          isDialogVisible={isRatingsDialogVisible}
          toggleDialog={toggleRatingsDialog}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;
