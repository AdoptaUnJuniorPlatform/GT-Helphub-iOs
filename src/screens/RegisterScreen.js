import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LogoLight from "../components/svgComponents/LogoLight";
import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white px-4">
        <View className="bg-primarios-violeta-100 w-full h-auto items-center py-[46px] mb-[20px] rounded-b-3xl">
          <LogoLight />

          <View className="mt-[34px]">
            <View>
              <Text className="text-white w-[243px] font-roboto-light text-[40px] mb-[5px]">
                Bienvenido a la comunidad
              </Text>
              <Text className="text-white font-roboto-regular text-subtitle1">
                Comparte, aprende, crece
              </Text>
            </View>
          </View>
        </View>

        <RegisterForm navigation={navigation} />

        <View className="flex-row items-center justify-center mt-[16px]">
          <Text className="text-neutral-color-blue-gray-500 font-poppins-medium text-[14px]">
            ¿Ya tienes una cuenta?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SessionStart")}>
            <Text className="font-poppins-medium text-[14px] text-neutral-color-gray-900">
              {" "}
              Ingresar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
