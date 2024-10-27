import { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { LogoDark, CustomButton, CheckIcon } from "../components";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

export default function EmailVerificationScreen({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const email = "usuario@gmail.com";

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationCodeFocused, setIsVerificationCodeFocused] =
    useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);

  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 bg-neutros-gris-fondo px-4">
        <View className="w-full items-center py-8">
          <LogoDark />
        </View>

        <View className="flex-1 justify-start mt-8">
          <Text className="text-neutros-negro text-xl font-roboto-medium mb-2">
            Introduce el código que hemos enviado a {email}
          </Text>
          <Text className="text-neutros-negro leading-6 text-base font-roboto-regular mb-2">
            Puede que tarde un minuto en recibir el correo.
          </Text>

          <View className="mb-3">
            <TextInput
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="Código email"
              keyboardType="email-address"
              className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 p-3"
              placeholderTextColor={
                isVerificationCodeFocused ? "#212121" : "#696868"
              }
              onFocus={() => setIsVerificationCodeFocused(true)}
              onBlur={() => setIsVerificationCodeFocused(false)}
            />
          </View>

          <Text className="text-neutros-negro-80 text-xs font-roboto-regular mb-5">
            Escribe aquí tu código (6 dígitos)
          </Text>

          <View className="flex-row justify-between items-center">
            <Text className="text-neutros-negro-80 font-roboto-medium text-sm">
              ¿Aún no recibes el código?
            </Text>
            <TouchableOpacity
              onPress={() => console.log("reenviar código")}
              className={`
                ${isBigScreen ? "h-[36px]" : ""}
                flex-row items-center justify-center rounded-lg
                `}
            >
              <Text className="uppercase font-roboto-bold text-xs text-primarios-celeste-100">
                Reenviar código
              </Text>
              <View className="ml-2">
                <Feather name={"chevron-right"} size={16} color="#496CEB" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-center">
            <View className="bg-[#eef1ff] rounded-lg p-3.5">
              <Text className="font-roboto-medium text-base text-neutros-negro mb-3">
                Verifica tu cuenta con tu mail
              </Text>
              <Text className="font-roboto-medium text-base text-primarios-violeta-100 mb-5">
                ¡No compartas este código de verificación con nadie, este lo
                utilizarás para autentificar tu cuenta!
              </Text>
            </View>
          </View>
        </View>

        <View
          className={`
            flex-row items-center justify-between 
            ${isSmallScreen ? "mt-auto mb-2" : "mt-8"}
            `}
        >
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
            variant="white"
            width="content"
            isBackButton
          />

          <CustomButton
            title="Continuar"
            onPress={() => {
              if (verificationCode) togglePopUp();
            }}
            variant="white"
            width="content"
            disabled={!verificationCode}
          />
        </View>
      </View>

      {isPopUpVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isPopUpVisible}
          onRequestClose={togglePopUp}
        >
          <View
            style={{
              backgroundColor: "rgba(144, 145, 146, 0.6)",
            }}
            className="absolute w-full h-screen flex-1 justify-center px-4"
          >
            <View
              className="bg-white p-6 rounded-lg items-start"
              style={{
                shadowColor: "#212121",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
              }}
            >
              <View className="w-full justify-center items-center gap-[10px] mb-5">
                <View className="w-full flex-row justify-end items-center mb-3">
                  <Pressable
                    onPress={() => {
                      togglePopUp();
                      navigation.navigate("RegisterStep1");
                    }}
                  >
                    <MaterialIcons name="close" size={18} color="#212121" />
                  </Pressable>
                </View>

                <CheckIcon />

                <Text className="text-primarios-violeta-100 font-roboto-bold text-2xl">
                  ¡Felicidades!
                </Text>
                <Text className="text-neutros-negro-80 font-roboto-regular text-base text-center">
                  Tu cuenta ha sido verificada con éxito
                </Text>
              </View>

              <View className="py-[11px] px-6 rounded-lg bg-[#eef1ff] w-full">
                <Text
                  className={`
                    text-neutros-negro-80 font-roboto-regular text-sm 
                    ${isSmallScreen ? "w-[90%]" : ""}
                    `}
                >
                  Ingresa tus datos para navegar por la web
                </Text>
              </View>

              {/* <View className="flex-row w-full justify-end">
                <CustomButton
                  onPress={() => {
                    togglePopUp();
                    navigation.navigate("RegisterStep1");
                  }}
                  title={"Continuar"}
                  width="content"
                />
              </View> */}
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
