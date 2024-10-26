import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import MessagesProfile from "../components/MessagesProfile";
import NotificationCard from "../components/NotificationCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AlertDialogIcon from "../components/svgComponents/AlertDialogIcon";

const { width } = Dimensions.get("window");

const NotificationsScreen = ({ navigation }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [activeTab, setActiveTab] = useState("Activos");
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [hasDialogShown, setHasDialogShown] = useState(false);
  const [isProfileVisible, setProfileVisible] = useState(false);

  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  const completed = [
    {
      id: 1,
      image: require("../../assets/avatar19.png"),
      name: "Laura",
      surname: "González",
      time: "12:44",
      status: "completed",
    },
  ];

  const requests = [
    {
      id: 1,
      image: require("../../assets/avatar20.png"),
      name: "Alberto",
      surname: "Zuñiga",
      time: "10:14",
      status: "request",
    },
  ];

  const active = [...completed, ...requests];

  const declined = [
    {
      id: 1,
      image: require("../../assets/avatar20.png"),
      name: "Alberto",
      surname: "Zuñiga",
      time: "10:19",
    },
  ];

  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "pm" && hours < 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const sortedActive = [...completed, ...requests].sort(
    (a, b) => parseTime(b.time) - parseTime(a.time),
  );

  const sortedDeclined = [...declined].sort(
    (a, b) => parseTime(b.time) - parseTime(a.time),
  );

  useFocusEffect(
    React.useCallback(() => {
      setHasDialogShown(false);
    }, []),
  );

  useEffect(() => {
    if (activeTab === "Activos" && active.length === 0 && !hasDialogShown) {
      setDialogVisible(true);
      setHasDialogShown(true);
    }
  }, [activeTab, active, hasDialogShown]);

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
            className={`${isBigScreen ? "h-[42px]" : isSmallScreen ? "h-[30px]" : "h-[36px]"} flex-row items-center justify-center px-8`}
          >
            <Text
              className={`font-roboto-medium ${isSmallScreen ? "text-[20px]" : "text-[22px]"} text-neutros-negro`}
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
            <Text className="font-roboto-medium text-[16px] text-neutros-negro-80">
              Declinados
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === "Activos" && (
            <View className="p-4 pt-4">
              {sortedActive.map((message, index) => (
                <NotificationCard
                  key={index}
                  status={message.status}
                  time={message.time}
                  image={message.image}
                  name={message.name}
                  surname={message.surname}
                  navigation={navigation}
                />
              ))}
            </View>
          )}

          {activeTab === "Activos" && active.length === 0 && (
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
                  className="bg-white p-[24px] rounded-[8px]"
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
                    className={`w-full mb-5 rounded-[8px] border-[1px] ${isBigScreen ? "py-[100px]" : isSmallScreen ? "py-[30px]" : "py-[80px]"} items-center justify-center border-neutral-color-blue-gray-100`}
                  >
                    <View className="mb-4">
                      <AlertDialogIcon />
                    </View>
                    <Text className="text-neutros-negro font-roboto-medium text-[18px] my-3">
                      Aún no hay notificaciones
                    </Text>
                    <Text className="text-neutros-negro-80 w-[65%] text-center font-roboto-regular text-[14px]">
                      De momento no tienes ninguna notificación.
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {activeTab === "Declinados" && (
            <View className="p-4">
              {sortedDeclined.map((message, index) => (
                <NotificationCard
                  key={index}
                  status={"declined"}
                  time={message.time}
                  image={message.image}
                  name={message.name}
                  surname={message.surname}
                  onPress={toggleProfile}
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
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;
