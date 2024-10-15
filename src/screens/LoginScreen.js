import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import LogoLight from "../components/svgComponents/LogoLight";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <SafeAreaView className="flex-1 bg-primarios-violeta-100">
      <View className="flex-1 bg-primarios-violeta-100">
        <ImageBackground
          source={require("../../assets/login-background.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        >
          <View className="flex-1">
            <View
              className={`px-8 ${isSmallScreen ? "py-5" : isBigScreen ? "py-14" : "py-10"}`}
            >
              <LogoLight />
            </View>
            <View className="flex-1">
              <View className="px-4 pb-9">
                <Text
                  className={`font-roboto-light ${isSmallScreen ? "text-[32px]" : isBigScreen ? "text-[38px]" : "text-[35px]"} text-white`}
                >
                  Conecta y Comparte
                </Text>
                <Text
                  className={`font-roboto-regular ${isSmallScreen ? "text-[32px]" : isBigScreen ? "text-[38px]" : "text-[35px]"} text-black`}
                >
                  Habilidades
                </Text>
              </View>

              <View>
                <Image source={require("../../assets/login-hero.png")} />
              </View>

              <View className="flex-1 justify-start items-center bg-transparent px-4 mt-[12%]">
                <View className="w-full">
                  <View className={`${isSmallScreen ? "mb-4" : "mb-7"}`}>
                    <TouchableOpacity
                      className="h-[36px] items-center justify-center rounded-[8px] w-full bg-white"
                      onPress={() => navigation.navigate("RegisterFlow")}
                    >
                      <Text className="font-roboto-bold text-[12px] uppercase text-primarios-violeta-100">
                        Crear cuenta nueva
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      className="h-[36px] items-center justify-center rounded-[8px] w-full bg-white"
                      onPress={() => navigation.navigate("SessionStart")}
                    >
                      <Text className="font-roboto-bold text-[12px] uppercase text-primarios-violeta-100">
                        Iniciar sesión
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  className={`items-center justify-center ${isBigScreen ? "mt-9" : isSmallScreen ? "mt-4" : "mt-7"}`}
                >
                  <Text className="text-neutros-gris-fondo text-[16px] font-roboto-regular mb-3">
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
