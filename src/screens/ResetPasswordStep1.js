import { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { LogoLight } from "../components";

const { width } = Dimensions.get("window");

export default function ResetPasswordStep1({ navigation }) {
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

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
            <View className="gap-2 mb-4">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 p-3"
                placeholderTextColor={isEmailFocused ? "#212121" : "#90A4AE"}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
            </View>
          </View>

          <TouchableOpacity
            className={`
              h-[36px] items-center justify-center rounded-[8px] w-full bg-primarios-violeta-100 
              ${isSmallScreen ? "mb-8" : ""}
              `}
            onPress={() => navigation.navigate("ResetPasswordStep2")}
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
