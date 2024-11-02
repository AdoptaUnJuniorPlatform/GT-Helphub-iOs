import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { LogoDark, CustomButton } from "../components";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { generateRandomCode } from "../utils/twoFaCodeGenerator";
import { getToken } from "../auth/authService";

const { width } = Dimensions.get("window");

export default function SessionStartVerificationScreen() {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  // const [isTwoFaFocused, setIsTwoFaFocused] = useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: ["", "", "", "", "", ""],
    },
  });

  const inputsRef = useRef([]);
  const code = watch("code");
  const isComplete = code.every((digit) => digit !== "");

  const handleDigitChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const codeArray = getValues("code");
      codeArray[index] = value;
      setValue("code", codeArray);

      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else if (value === "") {
      const codeArray = getValues("code");
      codeArray[index] = "";
      setValue("code", codeArray);
    }
  };

  const { email } = route.params;

  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  const onCodeSet = async () => {
    const token = await getToken();
    setIsSending(true);
    const twoFaCode = generateRandomCode();

    const payload = {
      email,
      twoFa: twoFaCode,
    };

    try {
      const response = await fetch(
        "http://localhost:4002/api/helphub/email-service/loginEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        console.log("Success", await response.json());
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
        alert("Se ha producido un error, intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Se ha producido un error, intenta de nuevo.");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    onCodeSet();
  }, []);

  const onSubmit = async (data) => {
    const token = await getToken();

    const verificationCode = data.code.join("");

    const payload = {
      email,
      twoFa: verificationCode,
    };

    try {
      const response = await fetch(
        "http://localhost:4002/api/helphub/email-service/loginEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          Authorization: `Bearer ${token}`,
        },
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Login successful", payload);
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
          <View className="rounded-lg bg-neutros-beige-fondo p-3.5 mb-5">
            <Text className="text-primarios-violeta-100 font-roboto-medium text-[34px] mb-3">
              Protege tu cuenta
            </Text>
            <Text className="text-neutros-negro font-roboto-medium text-base mb-2">
              Autenticación en dos factores (2FA)
            </Text>
            <View className="pl-2 pr-4 mb-2 flex-row items-center">
              <AntDesign name="checkcircleo" size={18} color="#496CEB" />
              <Text className="ml-2 text-neutros-negro-80 font-roboto-regular text-sm">
                Agregue acceso a la cuenta seguro y protegido
              </Text>
            </View>
            <View className="pl-2 pr-4 flex-row items-center">
              <AntDesign name="checkcircleo" size={18} color="#496CEB" />
              <Text className="ml-2 text-neutros-negro-80 font-roboto-regular text-sm">
                Reduce el riesgo de inicio de sesión no autorizada en las
                cuentas
              </Text>
            </View>
          </View>

          <Text className="text-neutros-negro text-xl font-roboto-medium mb-1">
            Introduce el código que hemos enviado a{" "}
            <Text className="text-primarios-violeta-100">{email}</Text>
          </Text>
          <Text className="text-neutros-negro leading-6 text-base font-roboto-regular mb-1">
            Puede que tarde un minuto en recibir el correo.
          </Text>
          <Text className="text-neutral-color-blue-gray-900 text-sm font-roboto-medium mb-2">
            Código email
          </Text>

          <View>
            {/* <Controller
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
            /> */}
            <View className="flex flex-row justify-start mb-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Controller
                  key={index}
                  name={`code[${index}]`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={(val) => {
                        onChange(val);
                        handleDigitChange(val, index);
                      }}
                      keyboardType="number-pad"
                      maxLength={1}
                      className="w-[32px] py-3 border-[1px] rounded-lg border-gray-300 text-center text-sm font-roboto-regular text-neutros-negro-80 mr-[10px]"
                      ref={(el) => (inputsRef.current[index] = el)}
                    />
                  )}
                />
              ))}
            </View>
          </View>

          <Text
            className={`
    text-xs font-roboto-regular mb-5
    ${errors.twoFa ? "text-red-error" : "text-neutros-negro-80"}
          `}
          >
            Escribe aquí tu código (6 dígitos)
          </Text>

          <View className="flex-1 justify-between">
            <View className="flex-row justify-between items-center">
              <Text className="text-neutros-negro-80 font-roboto-medium text-sm">
                ¿Aún no recibes el código?
              </Text>
              <TouchableOpacity
                onPress={onCodeSet}
                className={`
                ${isBigScreen ? "h-[36px]" : ""}
                flex-row items-center justify-center rounded-lg
                `}
                disabled={isSending}
              >
                <Text className="uppercase font-roboto-bold text-xs text-primarios-celeste-100">
                  Reenviar código
                </Text>
                <View className="ml-2">
                  <Feather name={"chevron-right"} size={16} color="#496CEB" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="bg-[#eef1ff] rounded-lg p-3.5">
              <Text className="font-roboto-regular text-xs text-primarios-violeta-100">
                {`Puedes configurar en cualquier momento a través de Perfil > Editar perfil`}
              </Text>
            </View>
          </View>
        </View>

        <View
          className={`
            flex-row items-center justify-between
            ${isSmallScreen ? "mt-auto mb-2" : "mt-4"}
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
            disabled={!isComplete}
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
              <View className="w-full justify-center items-center gap-[10px] mb-[11px]">
                <View className="w-full flex-row justify-end items-center mb-3">
                  <Pressable
                    onPress={() => {
                      togglePopUp();
                      navigation.navigate("HomeTabs");
                    }}
                  >
                    <MaterialIcons name="close" size={18} color="#212121" />
                  </Pressable>
                </View>

                <Text className="text-primarios-violeta-100 font-roboto-bold text-2xl">
                  ¡Activada!
                </Text>
                <Text className="text-neutros-negro-80 font-roboto-regular text-base text-center">
                  Tu autenticación en dos factores (2FA) ha sido habilitada
                  correctamente
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
