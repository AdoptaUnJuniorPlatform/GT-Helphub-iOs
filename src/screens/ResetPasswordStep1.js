import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LogoLight } from "../components";
import { generateRandomCode } from "../utils/twoFaCodeGenerator";
import { getScreenSize } from "../utils/screenSize";
import apiClient from "../api/apiClient";

export default function ResetPasswordStep1({ navigation }) {
  const { isSmallScreen } = getScreenSize();

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const twoFaCode = generateRandomCode();

    const payload = {
      email: data.email,
      twoFa: twoFaCode,
    };

    try {
      const response = await apiClient.post(
        "/email-service/resetEmail",
        payload,
      );

      if (response.status === 200) {
        console.log("Success", response.data);
        navigation.navigate("ResetPasswordStep2", {
          ...data,
          twoFa: twoFaCode,
        });
      } else {
        console.error(response.data.message);
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

        <View
          className={`
          flex-1 px-4 
          ${isSmallScreen ? "pb-4" : "pb-16"}
          `}
        >
          <Text className="text-primarios-violeta-100 text-xl font-roboto-medium mt-8 mb-2">
            Reseteo de contraseña
          </Text>
          <Text className="text-neutros-negro-80 leading-6 text-base font-roboto-regular">
            Por favor, introduce tu correo electrónico y te enviaremos un código
            para restablecer tu contraseña.
          </Text>

          <View className="flex-1 mt-8">
            <View className="mb-4">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Debe ser un correo válido",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={() => {
                      setIsEmailFocused(false);
                      onBlur();
                    }}
                    onFocus={() => setIsEmailFocused(true)}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Email"
                    autoCapitalize="none"
                    className={`
                bg-transparent border-[1px] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
                ${errors.email ? "border-red-error" : isEmailFocused ? "border-[#455A64]" : "border-neutral-color-blue-gray-100"}
                `}
                    placeholderTextColor={
                      isEmailFocused ? "#212121" : "#90a3ae"
                    }
                  />
                )}
              />
            </View>
          </View>

          <TouchableOpacity
            className={`
              h-[36px] items-center justify-center rounded-[8px] w-full bg-primarios-violeta-100 
              ${isSmallScreen ? "mb-8" : ""}
              `}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="font-roboto-bold text-xs uppercase text-white">
              Restablecer contraseña
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
