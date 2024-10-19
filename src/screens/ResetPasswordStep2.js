import { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import LogoLight from "../components/svgComponents/LogoLight";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get("window");

export default function ResetPasswordStep1({ navigation }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerificationCodeFocused, setVerificationCodeFocused] =
    useState(false);
  const [isOldPasswordFocused, setIsOldPasswordFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="bg-primarios-violeta-100 w-full items-center py-[30px] rounded-b-3xl">
          <LogoLight />
        </View>

        {/* Info */}
        <View className="bg-terciario-verde-fondo rounded-[8px] mx-4 mt-5 px-[20px] pt-[15px] pb-[10px]">
          <View className="flex-row items-center gap-4 mb-2">
            <AntDesign name="checkcircleo" size={24} color="#43A047" />
            <Text className="text-[14px] text-terciario-verde-oscuro font-roboto-medium">
              ¡Correo enviado!
            </Text>
          </View>
          <Text className="text-[12px] text-terciario-verde-oscuro font-roboto-400">
            Revisa tu bandeja de entrada para continuar con el reseteo de tu
            contraseña.
          </Text>
        </View>

        <View className={`flex-1 px-4 ${isSmallScreen ? "pb-4" : "pb-16"}`}>
          <Text
            className={`text-primarios-violeta-100 text-[20px] font-roboto-medium ${isSmallScreen ? "mt-6" : "mt-8"} mb-2`}
          >
            Reseteo de contraseña
          </Text>
          <Text className="text-neutros-negro-80 leading-6 text-[16px] font-roboto-regular">
            Por favor, introduce el código de verificación para restablecer tu
            contraseña.
          </Text>

          <View className={`flex-1 ${isSmallScreen ? "mt-6" : "mt-8"}`}>
            <View className="mb-4">
              <TextInput
                value={verificationCode}
                onChangeText={setVerificationCode}
                placeholder="Código"
                keyboardType="numeric"
                className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900  p-3"
                placeholderTextColor={
                  isVerificationCodeFocused ? "#212121" : "#90A4AE"
                }
                onFocus={() => setVerificationCodeFocused(true)}
                onBlur={() => setVerificationCodeFocused(false)}
              />
            </View>

            <View className="mb-4">
              <TextInput
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Contraseña antigua"
                keyboardType="default"
                className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900  p-3"
                placeholderTextColor={
                  isOldPasswordFocused ? "#212121" : "#90A4AE"
                }
                onFocus={() => setIsOldPasswordFocused(true)}
                onBlur={() => setIsOldPasswordFocused(false)}
              />
            </View>

            <View className="mb-4">
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nueva contraseña"
                keyboardType="default"
                className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900  p-3"
                placeholderTextColor={
                  isNewPasswordFocused ? "#212121" : "#90A4AE"
                }
                onFocus={() => setIsNewPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
              />
            </View>

            <View className="mb-4">
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmar nueva contraseña"
                keyboardType="default"
                className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900  p-3"
                placeholderTextColor={
                  isConfirmPasswordFocused ? "#212121" : "#90A4AE"
                }
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
              />
            </View>
          </View>

          <TouchableOpacity
            className="h-[36px] items-center justify-center rounded-[8px] w-full bg-primarios-violeta-100"
            onPress={() => navigation.navigate("SessionStart")}
          >
            <Text className="font-roboto-bold text-[12px] uppercase text-white">
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
