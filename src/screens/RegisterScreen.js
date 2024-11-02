import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LogoLight, RegisterForm } from "../components";

const { width } = Dimensions.get("window");

export default function RegisterScreen({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-neutros-gris-fondo px-4"
      >
        <View className="bg-primarios-violeta-100 w-full items-center py-[30px] rounded-b-3xl">
          <LogoLight />
        </View>

        <RegisterForm navigation={navigation} />

        <View
          className={`
            flex-row gap-1 justify-center 
            ${isSmallScreen ? "mb-3 mt-2" : isBigScreen ? "mt-4" : "mt-2"}
            `}
        >
          <Text className="text-neutros-negro-80 font-roboto-medium text-sm">
            ¿Ya tienes una cuenta?
          </Text>
          <TouchableOpacity>
            <Text
              onPress={() => navigation.navigate("SessionStartFlow")}
              className="text-primarios-celeste-100 font-roboto-medium text-sm underline"
            >
              Ingresar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
