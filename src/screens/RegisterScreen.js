import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import LogoLight from "../components/svgComponents/LogoLight";
import RegisterForm from "../components/forms/RegisterForm";

const { width } = Dimensions.get("window");

export default function RegisterScreen({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-white px-4"
      >
        <View className="bg-primarios-violeta-100 w-full items-center py-[30px] rounded-b-3xl">
          <LogoLight />
        </View>

        <RegisterForm navigation={navigation} />

        <View
          className={`flex-row gap-1 justify-center mt-2 ${isSmallScreen ? "mb-3" : ""}`}
        >
          <Text className="text-neutros-negro-80 font-roboto-medium text-[14px]">
            ¿Ya tienes una cuenta?
          </Text>
          <TouchableOpacity>
            <Text
              onPress={() => navigation.navigate("SessionStart")}
              className="text-primarios-azul-100 font-roboto-medium text-[14px] underline"
            >
              Ingresar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
