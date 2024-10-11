import { Text, View, SafeAreaView, ImageBackground, Image } from "react-native";
import LogoLight from "../components/svgComponents/LogoLight";
import CustomButton from "../components/CustomButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-primarios-violeta-100">
      <View className="flex-1 bg-primarios-violeta-100">
        <ImageBackground
          source={require("../../assets/login-background.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <View className="flex-1">
            <View className="px-8 py-10">
              <LogoLight />
            </View>
            <View className="flex-1">
              <View className="px-4 pb-9">
                <Text className="font-roboto-light text-[35px] text-white">
                  Conecta y Comparte
                </Text>
                <Text className="font-roboto-regular text-[35px] text-black">
                  Habilidades
                </Text>
              </View>

              <View>
                <Image source={require("../../assets/login-hero.png")} />
              </View>

              <View className="flex-1 justify-start items-center bg-transparent px-4 mt-12">
                <View className="w-full">
                  <View className="mb-7">
                    <CustomButton
                      onPress={() => navigation.navigate("RegisterFlow")}
                      title="Crear cuenta nueva"
                      variant="white"
                    />
                  </View>

                  <View>
                    <CustomButton
                      onPress={() => navigation.navigate("SessionStart")}
                      title="Iniciar sesión"
                      variant="white"
                    />
                  </View>
                </View>

                <View className="items-center justify-center mt-7">
                  <Text className="text-text-neutros-gris-fondo text-[16px] font-roboto-regular mb-[15px]">
                    Ingresa con
                  </Text>
                  <View className="flex-row gap-2">
                    <View className="bg-white h-[48px] w-[48px] rounded-[8px] justify-center items-center">
                      <FontAwesome
                        name="facebook-f"
                        size={24}
                        color="#7165d1"
                      />
                    </View>
                    <View className="bg-white h-[48px] w-[48px] rounded-[8px] justify-center items-center">
                      <Fontisto name="google" size={23} color="#7165d1" />
                    </View>
                    <View className="bg-white h-[48px] w-[48px] rounded-[8px] justify-center items-center">
                      <FontAwesome name="apple" size={27} color="#7165d1" />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
