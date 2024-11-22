import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LogoLight } from "../components";
import { getScreenSize } from "../utils/screenSize";
import apiClient from "../api/apiClient";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ResetPasswordStep1() {
  const { isSmallScreen } = getScreenSize();
  const [isTwoFaFocused, setIsTwoFaFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { email } = route.params;

  const onSubmit = async (data) => {
    const payload = {
      email,
      password: data.newPassword,
    };

    try {
      const response = await apiClient.patch("/auth/reset-password", payload);

      if (response.status === 200) {
        console.log("New password confirmed", data);
        navigation.navigate("SessionStart");
      } else {
        console.error(response.data);
        alert("Se ha producido un error, intenta de nuevo.");
      }
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

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 bg-neutros-gris-fondo">
        <View className="bg-primarios-violeta-100 w-full items-center py-[30px] rounded-b-3xl">
          <LogoLight />
        </View>

        {/* Info */}
        <View className="bg-terciario-verde-fondo rounded-lg mx-4 mt-5 px-5 pt-[15px] pb-2.5">
          <View className="flex-row items-center gap-4 mb-2">
            <AntDesign name="checkcircleo" size={24} color="#43A047" />
            <Text className="text-[14px] text-terciario-verde-oscuro font-roboto-medium">
              ¡Correo enviado!
            </Text>
          </View>
          <Text className="text-xs text-terciario-verde-oscuro font-roboto-400">
            Revisa tu bandeja de entrada para continuar con el reseteo de tu
            contraseña.
          </Text>
        </View>

        <View
          className={`
          flex-1 px-4 
          ${isSmallScreen ? "pb-4" : "pb-16"}
          `}
        >
          <Text
            className={`
              text-primarios-violeta-100 text-xl font-roboto-medium 
              ${isSmallScreen ? "mt-4 mb-1" : "mt-8 mb-2"}
              `}
          >
            Reseteo de contraseña
          </Text>
          <Text className="text-neutros-negro-80 leading-6 text-base font-roboto-regular">
            Por favor, introduce el código de verificación para restablecer tu
            contraseña.
          </Text>

          <View
            className={`
            flex-1 
            ${isSmallScreen ? "mt-4" : "mt-8"}
            `}
          >
            <View className="mb-4">
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
                    placeholder="Código"
                    className={`
                bg-transparent border-[1px] focus:border-[#455A64] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
                ${errors.twoFa ? "border-red-error" : isTwoFaFocused ? "border-[#455A64]" : "border-neutral-color-blue-gray-100"}
                `}
                    placeholderTextColor={
                      isTwoFaFocused ? "#212121" : "#90a3ae"
                    }
                  />
                )}
              />
            </View>

            <View className="mb-4">
              <Controller
                control={control}
                name="newPassword"
                rules={{
                  required: "Contraseña es obligatoria",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                    message:
                      "Debe tener al menos una mayúscula, un número, un símbolo y 6 caracteres",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={() => {
                      setIsNewPasswordFocused(false);
                      onBlur();
                    }}
                    onFocus={() => setIsNewPasswordFocused(true)}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Nueva contraseña"
                    className={`
                bg-transparent border-[1px] focus:border-[#455A64] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
                ${errors.newPassword ? "border-red-error" : isNewPasswordFocused ? "border-[#455A64]" : "border-neutral-color-blue-gray-100"}
                `}
                    placeholderTextColor={
                      isNewPasswordFocused ? "#212121" : "#90a3ae"
                    }
                    secureTextEntry
                  />
                )}
              />
            </View>

            <View className="mb-4">
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: "La confirmación de contraseña es obligatoria",
                  validate: (value) => {
                    const { newPassword } = getValues();
                    return (
                      value === newPassword || "Las contraseñas no coinciden"
                    );
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                    message:
                      "Debe tener al menos una mayúscula, un número, un símbolo y 6 caracteres",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={() => {
                      setIsConfirmPasswordFocused(false);
                      onBlur();
                    }}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Confirmar nueva contraseña"
                    className={`
          bg-transparent border-[1px] focus:border-[#455A64] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
          ${errors.confirmPassword ? "border-red-error" : isConfirmPasswordFocused ? "border-[#455A64]" : "border-neutral-color-blue-gray-100"}
          `}
                    placeholderTextColor={
                      isConfirmPasswordFocused ? "#212121" : "#90a3ae"
                    }
                    secureTextEntry
                  />
                )}
              />
            </View>
          </View>

          <TouchableOpacity
            className={`
              h-[36px] items-center justify-center rounded-lg w-full bg-primarios-violeta-100 
              ${isSmallScreen ? "mb-8" : ""}
              `}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="font-roboto-bold text-xs uppercase text-white">
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
