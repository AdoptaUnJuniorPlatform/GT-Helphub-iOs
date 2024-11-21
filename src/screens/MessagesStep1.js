import { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CustomButton } from "../components";
import { getScreenSize } from "../utils/screenSize";
import { initializeSocket, getSocket } from "../socket/socket";
import { useUser } from "../user/UserContext";
import { fetchProfileImage } from "../api/apiCalls";
import Feather from "@expo/vector-icons/Feather";
import apiClient from "../api/apiClient";
// import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MessagesStep1 = ({ navigation, route }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();
  const { transmitter, receiver } = route.params;

  const { userData } = useUser();
  const user_id = userData?._id;
  let senderId;
  if (transmitter === user_id) {
    senderId = receiver;
  } else {
    senderId = transmitter;
  }

  console.log(user_id, senderId);

  const [user, setUser] = useState({ nameUser: "", surnameUser: "" });

  const [transmitterImage, setTransmitterImage] = useState(null);
  const [receiverImage, setReceiverImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef(null);

  const fetchUser = async (userId) => {
    try {
      const response = await apiClient.get(`/user/user-id/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  const fetchMessages = async (user_id, senderId) => {
    try {
      const response = await apiClient.get(
        `/chat/conversation/${user_id}/${senderId}`,
      );
      const updatedMessages = response.data.map((message) => ({
        ...message,
        isSender: message.from === user_id,
      }));
      const sortedMessages = updatedMessages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      );
      setMessages(sortedMessages);
      console.log("MESSAGES", response.data);
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

  useEffect(() => {
    fetchMessages(user_id, senderId);
  }, []);

  useEffect(() => {
    fetchUser(senderId);
  }, [senderId]);

  useEffect(() => {
    let socketInstance;
    const setupSocket = async () => {
      socketInstance = await initializeSocket(userData);
      socketInstance.on("privateMessage", (message, formattedDate, id) => {
        if (id === senderId) {
          console.log("Mensaje Privado:", message, formattedDate, id);
        }
      });
    };

    setupSocket();

    return () => {
      if (socketInstance) {
        socketInstance.off("privateMessage");
        socketInstance.disconnect();
      }
    };
  }, [userData]);

  const sendPrivateMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          from: user_id,
          message: newMessage,
          isSender: true,
        },
      ]);
      const socketInstance = getSocket();
      socketInstance.emit("privateMessage", {
        from: user_id,
        to: senderId,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const transmitterImg = await fetchProfileImage(transmitter);
        const receiverImg = await fetchProfileImage(receiver);
        setTransmitterImage(transmitterImg);
        setReceiverImage(receiverImg);
      } catch (error) {
        console.error("Error fetching profile images:", error);
      }
    };
    fetchImages();
  }, [transmitter, receiver]);

  return (
    <SafeAreaView className="flex-1 h-full bg-neutros-gris-fondo">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Go To Messages */}
        <View className="bg-neutros-gris-fondo w-full py-2 flex-row justify-start items-center">
          <TouchableOpacity
            className={`
              ${isBigScreen ? "h-[42px]" : isSmallScreen ? "h-[30px]" : "h-[36px]"} 
              flex-row items-center justify-center pl-2 pr-4
              `}
            onPress={() =>
              navigation.navigate("HomeTabs", {
                tab: "Mensajes",
                params: { senderId },
              })
            }
          >
            <View className="mr-[8px]">
              <Feather
                name="chevron-left"
                size={isSmallScreen ? 24 : 28}
                color="#696868"
              />
            </View>
            <Text
              className={`
                font-roboto-medium text-neutros-negro
                ${isSmallScreen ? "text-xl" : "text-[22px]"}
                `}
            >
              Mensaje
            </Text>
          </TouchableOpacity>
        </View>

        {/* TODO: Exchange endpoints revision is necessary */}
        {/* Info Card */}
        <View className="p-4 bg-neutros-beige-fondo">
          <View className="flex-row items-center justify-center px-4">
            <View className="flex-1 flex-row items-center">
              <View className="w-[45px] h-[45px] rounded-full mr-2">
                <Image
                  source={{ uri: transmitterImage }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                  className="rounded-full"
                />
              </View>

              <View className="w-2/3 overflow-ellipsis">
                <View className="w-full">
                  <Text className="mr-1 text-sm font-roboto-medium text-neutros-negro">
                    {user.nameUser}
                  </Text>
                  <Text className="text-sm font-roboto-medium text-neutros-negro">
                    {user.surnameUser}
                  </Text>
                </View>
              </View>
            </View>

            {/* <View className="items-start">
              <Text
                className={`
                  font-roboto-regular text-sm text-neutros-negro 
                  ${isSmallScreen ? "mb-1" : "mb-2"}
                  `}
              >
                Intercambiar habilidades:
              </Text>
              <View className="flex-row items-center">
                <View className="flex-row w-content py-1 px-2 rounded-full items-center bg-transparent border-[1px] border-neutros-negro-80">
                  <Text className="font-roboto-regular text-xs text-neutros-negro-80">
                    Figma
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
                    Diseño
                  </Text>
                </View>
              </View>
            </View> */}

            <CustomButton
              onPress={() => navigation.navigate("MessagesStep2")}
              title={"Finalizar intercambio"}
              width="content"
              variant="filled"
            />
          </View>

          {/* <View className="justify-center items-end mt-4">
            <CustomButton
              onPress={() => navigation.navigate("MessagesStep2")}
              title={"Finalizar intercambio"}
              width="content"
              variant="filled"
            />
          </View> */}
        </View>
        <View className="flex-1 justify-between">
          <ScrollView
            className="flex-2 p-4"
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {messages.map((message, index) => {
              // const isSender = message.isSender;
              // const profileImg = isSender ? receiverImage : transmitterImage;

              // const isLastFromUser =
              //   index === messages.length - 1 ||
              //   messages[index + 1].user !== message.user;

              return (
                <View
                  key={message.timestamp}
                  className={`w-full mb-1 ${message.isSender ? "items-end" : "items-start"}`}
                >
                  <View
                    className={`
                      py-[17px] px-[22px] mb-1 rounded-[5px] max-w-[70%] 
                      ${message.isSender ? "bg-neutros-beige-fondo" : "bg-primarios-celeste-20"}
                      `}
                  >
                    <Text className="text-neutros-negro text-sm font-roboto-regular">
                      {message.message}
                    </Text>
                  </View>
                  {/* {isLastFromUser && (
                    <Image
                      className="w-[55px] h-[55px] rounded-full mt-0.5"
                      source={{ uri: profileImg }}
                      resizeMode="cover"
                    />
                  )} */}
                </View>
              );
            })}
            <View className="h-20" />
          </ScrollView>

          <View
            View
            className="flex-0 flex-row px-4 p-4 border-t-[1px] border-neutros-negro-50"
          >
            <View className="flex-1">
              <TextInput
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Escribe un mensaje..."
                keyboardType="default"
                className="bg-transparent h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 p-3"
                placeholderTextColor={"#90A4AE"}
              />
            </View>
            <View className="flex-row justify-end">
              <CustomButton
                onPress={sendPrivateMessage}
                title={"Enviar mensaje"}
                width="content"
                variant="filled"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesStep1;
