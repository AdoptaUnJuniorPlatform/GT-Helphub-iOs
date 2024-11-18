import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { CustomButton, LogoLight } from "../components";

export default function PolicyStep1({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 justify-between px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="bg-primarios-violeta-100 w-full items-center py-[30px] rounded-b-3xl">
            <LogoLight />
          </View>

          <View className="mt-5 mb-4">
            <View>
              <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                1. Términos de Servicio
              </Text>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  1.1
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Edad mínima y condiciones de uso
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  HelpHub está destinado exclusivamente para mayores de 18 años
                  debido a la naturaleza presencial de los intercambios.
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Está prohibido realizar actividades ilegales, fraudulentas,
                  comerciales o promocionales, o que violen derechos de terceros
                  en la plataforma.
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Los usuarios deben respetar los derechos de otros y evitar
                  contenido ofensivo, discriminatorio, difamatorio o que incite
                  al odio o la violencia.
                </Text>
                <Text className="font-roboto-regular text-base text-neutros-negro-80">
                  Se prohíbe crear múltiples cuentas, suplantar identidades, o
                  usar fotos de perfil que no correspondan a la persona titular
                  de la cuenta.
                </Text>
              </View>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  1.2
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Limitación de responsabilidad
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  HelpHub no garantiza la disponibilidad continua del servicio y
                  no se hace responsable de fallos técnicos ni eventos fuera de
                  su control.
                </Text>
                <Text className="font-roboto-regular text-base text-neutros-negro-80">
                  La plataforma no garantiza la veracidad de los datos de los
                  usuarios ni se responsabiliza por daños resultantes del uso de
                  la aplicación.
                </Text>
              </View>
            </View>
          </View>
          {/* Navigation Button Set */}
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
