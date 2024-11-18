import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { CustomButton, LogoLight } from "../components";

export default function PolicyStep2({ navigation }) {
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
                2. Política de Privacidad
              </Text>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  2.1
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Información recolectada (datos específicos que se recolectan)
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Datos personales: nombre, edad, ubicación aproximada (para
                  hacer el match).
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Datos de contacto: correo electrónico (para registro y/o
                  comunicación interna).
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Datos de perfil: habilidades, disponibilidad horaria, foto de
                  perfil.
                </Text>
                <Text className="font-roboto-regular text-base text-neutros-negro-80">
                  Autenticación: implementación de 2FA para seguridad adicional.
                </Text>
              </View>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  2.2
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Uso de los datos
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Los datos se utilizarán únicamente para conectar usuarios con
                  habilidades complementarias y mejorar la experiencia de uso.
                </Text>
                <Text className="font-roboto-regular text-base text-neutros-negro-80">
                  HelpHub no compartirá datos personales con terceros sin
                  consentimiento explícito, salvo en casos requeridos por ley.
                </Text>
              </View>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  2.3
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Retención y eliminación de datos
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Los datos personales se conservarán mientras la cuenta esté
                  activa y serán eliminados en un plazo de X meses tras la
                  desactivación de la cuenta (este plazo puede ajustarse cuando
                  el equipo defina los períodos de retención).
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  El usuario podrá solicitar la eliminación de su cuenta y de
                  sus datos en cualquier momento.
                </Text>
              </View>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  2.4
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Seguridad de los datos
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Los datos personales serán encriptados (detallar el nivel de
                  encriptación una vez que esté implementado) y almacenados en
                  servidores seguros.
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  El acceso a los datos estará restringido al personal
                  autorizado de HelpHub.
                </Text>
              </View>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  2.5
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Derechos del usuario (GDPR)
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Derecho a acceder, rectificar, y eliminar sus datos.
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Derecho a limitar el procesamiento y a la portabilidad de los
                  datos.
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Derecho a oponerse al procesamiento de datos en cualquier
                  momento.
                </Text>
              </View>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  2.6
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Cookies:
                </Text>
              </View>
              <View className="mb-2">
                <Text className="font-roboto-medium text-xl text-neutros-negro-80">
                  si guarda tokens de sesión o algún identificador de usuario en
                  el dispositivo, estos son equivalentes a cookies, permisos de
                  APIs, etc y deben explicarse:
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Tipo de información almacenada: sesión, preferencias,
                  autenticación.
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Duración de la cookie: cuánto tiempo permanecerá en el
                  dispositivo.
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Propósito: Explicar por qué se usan, como “para recordar la
                  sesión del usuario y mejorar su experiencia”.
                </Text>
                <Text className="font-roboto-regular text-base text-neutros-negro-80">
                  Opciones del usuario: permitir que el usuario desactive
                  ciertas cookies o tokens si es posible, y explicar cómo puede
                  hacerlo.
                </Text>
              </View>
            </View>
            <View className="mt-3">
              <View>
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  2.7
                </Text>
              </View>
              <View className="mb-1">
                <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
                  Datos compartidos con terceros:
                </Text>
              </View>
              <View>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Qué datos se comparten: detallar los tipos de datos
                  compartidos, como email o datos de perfil.
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Quiénes son los terceros: nombrar o describir el tipo de
                  proveedores (por ejemplo, proveedores de correo electrónico,
                  análisis de datos).
                </Text>
                <Text className="mb-2 font-roboto-regular text-base text-neutros-negro-80">
                  Finalidad de la transferencia: explicar por qué se comparten
                  los datos.
                </Text>
                <Text className="font-roboto-regular text-base text-neutros-negro-80">
                  Seguridad: mencionar cualquier medida de protección para
                  asegurar la transferencia segura de datos.
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
              onPress={() => navigation.navigate("PolicyStep3")}
              variant="white"
              width="content"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
