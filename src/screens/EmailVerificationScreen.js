import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { LogoDark, CustomButton, CheckIcon } from "../components";
import { generateRandomCode } from "../utils/twoFaCodeGenerator";
import { getScreenSize } from "../utils/screenSize";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import apiClient from "../api/apiClient";

export default function EmailVerificationScreen() {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const [isTwoFaFocused, setIsTwoFaFocused] = useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const value = watch("twoFa");

  const { email, nameUser, surnameUser, phone, password, optionCall } =
    route.params;

  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  const onCodeReset = async () => {
    setIsResending(true);
    const twoFaCode = await generateRandomCode();

    const payload = {
      email,
      password,
      nameUser,
      surnameUser,
      phone,
      optionCall,
      showPhone: false,
      blocked: false,
      twoFa: twoFaCode,
      role: "user",
    };

    try {
      await apiClient.post("/email-service/emailAcount", payload);
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.message);
        alert("Se ha producido un error, intenta de nuevo.");
      } else {
        console.error("Error:", error);
        alert("Se ha producido un error inesperado, intenta de nuevo.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      email,
      password,
      nameUser,
      surnameUser,
      phone,
      optionCall,
      showPhone: false,
      blocked: false,
      twoFa: data.twoFa,
      role: "user",
    };

    try {
      const response = await fetch(
        "http://localhost:4002/api/helphub/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Data sent to register: ", data);
        togglePopUp();
      } else {
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 bg-neutros-gris-fondo px-4">
        <View className="w-full items-center py-8">
          <LogoDark />
        </View>

        <View className="flex-1 justify-start mt-8">
          <Text className="text-neutros-negro text-xl font-roboto-medium mb-2">
            Introduce el código que hemos enviado a{" "}
            <Text className="text-primarios-violeta-100">{email}</Text>
          </Text>
          <Text className="text-neutros-negro leading-6 text-base font-roboto-regular mb-2">
            Puede que tarde un minuto en recibir el correo.
          </Text>

          <View className="mb-3">
            <Controller
              control={control}
              name="twoFa"
              rules={{
                required: "El código de verificación es obligatorio",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message:
                    "El código debe ser de 6 dígitos y solo contener números",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={() => {
                    setIsTwoFaFocused(false);
                    onBlur();
                  }}
                  onFocus={() => setIsTwoFaFocused(true)}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Código email"
                  className={`
                bg-transparent border-[1px] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
                ${errors.twoFa ? "border-red-error" : isTwoFaFocused ? "border-[#455A64]" : "border-neutral-color-blue-gray-100"}
                `}
                  placeholderTextColor={isTwoFaFocused ? "#212121" : "#90a3ae"}
                />
              )}
            />
          </View>

          <Text
            className={`
    text-xs font-roboto-regular mb-5 
    ${errors.twoFa ? "text-red-error" : "text-neutros-negro-80"}
          `}
          >
            Escribe aquí tu código (6 dígitos)
          </Text>

          <View className="flex-row justify-between items-center">
            <Text className="text-neutros-negro-80 font-roboto-medium text-sm">
              ¿Aún no recibes el código?
            </Text>
            <TouchableOpacity
              onPress={onCodeReset}
              className={`
                ${isBigScreen ? "h-[36px]" : ""}
                flex-row items-center justify-center rounded-lg
                `}
              disabled={isResending}
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
            onPress={handleSubmit(onSubmit)}
            variant="white"
            width="content"
            disabled={!value || errors.twoFa}
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
                      navigation.navigate("SessionStartFlow");
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
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
