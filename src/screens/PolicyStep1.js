import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { CustomButton, LogoLight, PolicySection } from "../components";
import { policySections1 } from "../data/data";

export default function PolicyStep1({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 justify-between px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="bg-primarios-violeta-100 w-full items-center py-[30px] rounded-b-3xl">
            <LogoLight />
          </View>

          <View className="mt-5 mb-4">
            <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
              1. Términos de Servicio
            </Text>
            {policySections1.map((section) => (
              <PolicySection key={section.id} section={section} />
            ))}
          </View>

          <View className="flex-row items-center justify-between">
            <CustomButton
              title="Atrás"
              onPress={() => navigation.goBack()}
              width="content"
              isBackButton
            />
            <CustomButton
              title="Continuar"
              onPress={() => navigation.navigate("PolicyStep2")}
              variant="white"
              width="content"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
