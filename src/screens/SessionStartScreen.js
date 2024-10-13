import { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import LogoLight from "../components/svgComponents/LogoLight";
import Feather from "@expo/vector-icons/Feather";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="bg-primarios-violeta-100 w-full items-center py-[30px] mb-[20px] rounded-b-3xl">
          <LogoLight />
        </View>

        <View className="flex-1 px-4 pb-8">
          <Text className="text-primarios-violeta-100 text-[24px] font-roboto-regular mt-[30px] mb-[20px]">
            Inicia Sesión
          </Text>

          <View className="flex-1">
            <View className="mb-2">
              <View className="gap-2 mb-4">
                <Text className="font-poppins-medium text-[14px] text-primarios-violeta-100">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ejemplo@gmail.com"
                  keyboardType="email-address"
                  className="bg-[#E3E0F6] border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900  p-3"
                  placeholderTextColor={isEmailFocused ? "#212121" : "#696868"}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </View>

              <View className="gap-2 mb-4">
                <Text className="font-poppins-medium text-[14px] text-primarios-violeta-100">
                  Contraseña
                </Text>
                <View className="relative border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] bg-[#E3E0F6] flex-row items-center justify-between">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="********"
                    keyboardType="email-address"
                    secureTextEntry={!isPasswordVisible}
                    className="bg-transparent flex-shrink rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900  p-3"
                    placeholderTextColor={
                      isPasswordFocused ? "#212121" : "#696868"
                    }
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <TouchableOpacity
                    className="px-3"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Feather
                      name={isPasswordVisible ? "eye" : "eye-off"}
                      size={20}
                      color={isPasswordFocused ? "#212121" : "#90a3ae"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="w-full pl-4">
                <View className="flex-row items-start">
                  <TouchableOpacity
                    className="mr-2"
                    onPress={() => setRemember(!remember)}
                  >
                    <View
                      className={`w-[18px] h-[18px] bg-neutros-beige-fondo items-center justify-center`}
                    >
                      {remember && (
                        <Feather name="check" size={12} color="#7165d1" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="flex-row flex-wrap">
                    <Text className="text-neutros-negro-80 font-roboto-regular text-[16px]">
                      Recuérdame
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="h-[36px] items-center justify-center rounded-[8px] w-full bg-primarios-violeta-100"
            onPress={() => navigation.navigate("HomeTabs")}
          >
            <Text className="font-roboto-bold text-[12px] uppercase text-white">
              Inicia Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
