import { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CustomButton, RatingsDialog } from "../components";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const MessagesStep2 = ({ navigation }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [isDialogVisible, setDialogVisible] = useState(false);

  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Martina",
      text: "Sí! Me ha salido todo muy bien!",
      isSender: false,
    },
    {
      id: 2,
      user: "Juanita",
      text: "Qué bueno que te pude ayudar!",
      isSender: true,
    },
    { id: 3, user: "Juanita", text: "Me alegra mucho!", isSender: true },
  ]);

  // const [newMessage, setNewMessage] = useState("");

  const scrollViewRef = useRef(null);

  // const handleSendMessage = () => {
  //   if (newMessage.trim()) {
  //     setMessages([
  //       ...messages,
  //       {
  //         id: messages.length + 1,
  //         user: "Juanita",
  //         text: newMessage,
  //         isSender: true,
  //       },
  //     ]);
  //     setNewMessage("");
  //   }
  // };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 h-full bg-neutros-gris-fondo">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === " ios" ? "padding" : "height"}
      >
        {/* Go To Messages */}
        <View className="bg-neutros-gris-fondo w-full py-2 flex-row justify-start items-center">
          <TouchableOpacity
            className={`
              ${isBigScreen ? "h-[42px]" : isSmallScreen ? "h-[30px]" : "h-[36px]"} 
              flex-row items-center justify-center pl-2 pr-4
              `}
            onPress={() => navigation.navigate("HomeTabs", { tab: "Mensajes" })}
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
                font-roboto-medium text-neutros-negro
                ${isSmallScreen ? "text-xl" : "text-[22px]"}
                `}
            >
              Mensaje
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View className="p-4 bg-neutros-beige-fondo">
          <View className="flex-row items-center justify-center px-4">
            <View className="flex-1 flex-row items-center">
              <View className="w-[45px] h-[45px] rounded-full mr-2">
                <Image
                  source={require("../../assets/avatar11.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </View>

              <View className="w-2/3 overflow-ellipsis">
                <View className="w-full">
                  <Text className="mr-1 text-sm font-roboto-medium text-neutros-negro">
                    Martina
                  </Text>
                  <Text className="text-sm font-roboto-medium text-neutros-negro">
                    Farías
                  </Text>
                </View>
              </View>
            </View>
            {/* Intercambiar... */}
            <View className="items-start">
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
            </View>
          </View>

          <View className="justify-center items-center mt-4">
            <CustomButton
              onPress={toggleDialog}
              title={"Valorar intercambio"}
              width="content"
              variant="filled"
            />
          </View>
        </View>

        <View className="flex-1 justify-between">
          <ScrollView
            className="flex-2 p-4"
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {messages.map((message, index) => {
              const isLastFromUser =
                index === messages.length - 1 ||
                messages[index + 1].user !== message.user;

              return (
                <View
                  key={message.id}
                  className={`
                    w-full mb-1 
                    ${message.isSender ? "items-end" : "items-start"}
                    `}
                >
                  <View className="py-[17px] px-[22px] mb-1 rounded-[5px] max-w-[70%] bg-neutros-beige-fondo">
                    <Text className="text-neutros-negro text-sm font-roboto-regular">
                      {message.text}
                    </Text>
                  </View>
                  {isLastFromUser && (
                    <Image
                      source={require("../../assets/avatar11.png")}
                      className="w-[55px] h-[55px] rounded-[20px] mt-0.5"
                      resizeMode="contain"
                    />
                  )}
                </View>
              );
            })}

            {/* Separator */}
            <View className="h-20" />
          </ScrollView>

          {/* Info */}
          <View className="bg-terciario-celeste items-center rounded-lg mx-4 my-2 px-4 py-3">
            <View className="flex-row items-center px-3">
              <MaterialIcons name="info-outline" size={15} color="#0F547A" />
              <Text className="ml-3 text-wrap w-full text-sm text-terciario-celeste-muy-oscuro font-roboto-medium">
                Esta conversación estará disponible hasta el día 00/00/00
              </Text>
            </View>

            <View className="mt-2 justify-center items-end self-end">
              <TouchableOpacity className="flex-row h-[36px] items-center justify-center rounded-lg w-fit px-4 bg-terciario-celeste-oscuro">
                <Text className="font-roboto-medium text-xs uppercase terciario-celeste-muy-oscuro">
                  Borrar mensaje
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Send Message */}
          <View
            View
            className="flex-0 flex-row px-4 p-4 border-t-[1px] border-neutros-negro-50"
          >
            <View className="flex-1">
              <TextInput
                // value={newMessage}
                // onChangeText={setNewMessage}
                placeholder="Escribe un mensaje..."
                keyboardType="default"
                className="bg-transparent h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 p-3"
                placeholderTextColor={"#90A4AE"}
              />
            </View>
            <View className="flex-row justify-end">
              <TouchableOpacity
                className="flex-row h-[36px] items-center justify-center rounded-lg w-fit px-4 bg-neutros-negro-50"
                style={{
                  shadowColor: "#212121",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                }}
                disabled
              >
                <Text className="font-roboto-bold text-xs uppercase text-white">
                  Enviar mensaje
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      {isDialogVisible && (
        <RatingsDialog
          isDialogVisible={isDialogVisible}
          toggleDialog={toggleDialog}
        />
      )}
    </SafeAreaView>
  );
};

export default MessagesStep2;
