import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { CustomButton, LogoLight, PolicySection } from "../components";
import { policySections3 } from "../data/data";

export default function PolicyStep3({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 justify-between px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="bg-primarios-violeta-100 w-full items-center py-[30px] rounded-b-3xl">
            <LogoLight />
          </View>

          <View className="mt-5 mb-4">
            <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
              3. Uso de Permisos en Dispositivos Móviles
            </Text>
            <Text className="mt-3 font-roboto-regular text-xl text-neutros-negro-80">
              Para el correcto funcionamiento de la aplicación HelpHub, se
              requieren los siguientes permisos en dispositivos Android. Todos
              los permisos solicitados se limitan a funciones estrictamente
              necesarias y se solicitarán de manera transparente al usuario.
            </Text>

            <View className="mt-3">
              {policySections3.map((section) => (
                <PolicySection key={section.id} section={section} />
              ))}
              <View className="mt-3">
                <Text className="font-roboto-regular text-xl text-neutros-negro-80">
                  Los permisos anteriores se solicitarán únicamente al momento
                  de usar la función correspondiente y de forma explícita. Los
                  usuarios tienen la opción de revocar estos permisos desde la
                  configuración de su dispositivo en cualquier momento, aunque
                  esto podría afectar ciertas funcionalidades de HelpHub.
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <CustomButton
              title="Atrás"
              onPress={() => navigation.goBack()}
              width="content"
              isBackButton
            />
            <CustomButton
              title="Continuar Registro"
              onPress={() => navigation.navigate("RegisterFlow")}
              variant="white"
              width="content"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
