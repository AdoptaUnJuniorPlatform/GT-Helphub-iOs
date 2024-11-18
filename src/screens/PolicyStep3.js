import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { CustomButton, LogoLight } from "../components";

export default function PolicyStep3({ navigation }) {
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
                3. Uso de Permisos en Dispositivos Móviles
              </Text>
            </View>
            <View className="mt-3">
              <Text className="font-roboto-regular text-xl text-neutros-negro-80">
                Para el correcto funcionamiento de la aplicación HelpHub, se
                requieren los siguientes permisos en dispositivos Android. Todos
                los permisos solicitados se limitan a funciones estrictamente
                necesarias y se solicitarán de manera transparente al usuario.
              </Text>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  3.1
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Cámara:
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Propósito: permitir al usuario capturar una foto en tiempo
                  real como su foto de perfil
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Nota: este permiso sólo se activará en el caso de que el
                  usuario opte por tomar una foto en lugar de seleccionar una de
                  su galería.
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Alternativa: si prefieren no otorgar este permiso, el usuario
                  puede optar por subir una foto de perfil desde la galería del
                  dispositivo.
                </Text>
              </View>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  3.2
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Almacenamiento Externo (Lectura):
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Propósito: permitir al usuario seleccionar una imagen de
                  perfil desde la galería del dispositivo.
                </Text>
                <Text className="font-roboto-regular text-base text-neutros-negro-80">
                  Información adicional: HelpHub no accede a otros archivos
                  fuera de la imagen seleccionada por el usuario.
                </Text>
              </View>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  3.3
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Almacenamiento Externo (Escritura):
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Propósito: permitir la descarga de datos de la aplicación o
                  almacenamiento de configuraciones específicas en el
                  dispositivo del usuario (si corresponde).
                </Text>
                <Text className="font-roboto-regular text-base text-neutros-negro-80">
                  Nota: este permiso se solicita solo si la funcionalidad
                  requiere guardar archivos o configuraciones locales en el
                  dispositivo.
                </Text>
              </View>
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
          {/* Navigation Button Set */}
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
