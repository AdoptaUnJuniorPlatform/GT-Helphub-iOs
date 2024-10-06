import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LogoLight from "../components/LogoLight";
import RegisterForm from "../components/RegisterForm";

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white px-4">
        <View className="bg-[#7165d2] w-full h-auto items-center py-[46px] mb-[20px] rounded-b-3xl">
          <LogoLight />

          <View className="mt-[34px]">
            <View>
              <Text className="text-white font-light text-[40px] mb-[5px]">
                Bienvenido a la comunidad
              </Text>
              <Text className="text-white text-[16px]">
                Comparte, aprende, crece
              </Text>
            </View>
          </View>
        </View>

        <RegisterForm navigation={navigation} />

        <View className="flex-row items-center justify-center mt-[16px]">
          <Text className="text-[#607d8a] font-medium text-14">
            ¿Ya tienes una cuenta?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SessionStart")}>
            <Text className="font-medium text-[14px] text-[#212121]">
              {" "}
              Ingresar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
