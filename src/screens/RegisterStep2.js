import { useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import StepHeader from "../components/StepHeader";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import AvatarChecked from "../components/AvatarChecked";
import * as ImagePicker from "expo-image-picker";
import StepTitle from "../components/StepTitle";

export default function RegisterStep2({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const opacity = useRef(new Animated.Value(0)).current;

  const toggleDialog = () => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setVisible(false));
    } else {
      setVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("¡Permiso de acceso a la galería es necesario!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <View className="flex-1 justify-between">
          <View>
            <StepHeader
              step={"2"}
              label1={"Tu foto"}
              label2={"Disponibilidad"}
              status1={"active"}
              status2={"inactive"}
            />
            <StepTitle
              title="Paso 2"
              subtitle="Una foto vale más que mil palabras"
            />

            <View className="gap-[20px] mt-1">
              <View>
                <View className="flex-row justify-between items-center mb-[8px] mr-3">
                  <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px]">
                    Escoger una foto
                  </Text>

                  <Pressable
                    onPress={toggleDialog}
                    className="flex-row gap-1 items-center"
                  >
                    <Ionicons
                      name="information-circle"
                      size={19}
                      color="#1945e2"
                    />
                    <Text className="uppercase text-primarios-celeste-100 text-[12px] font-roboto-bold">
                      Consejos
                    </Text>
                  </Pressable>
                </View>
                <Text className="text-neutral-color-blue-gray-500 leading-6 font-roboto-regular text-[16px]">
                  En HelpHub, todas las personas deben tener una fotografía en
                  donde se muestre claramente su rostro.
                </Text>
              </View>

              <View className="flex-row justify-between gap-2 items-center pt-6 px-14">
                <AvatarChecked source={require("../../assets/avatar1.png")} />
                <AvatarChecked source={require("../../assets/avatar2.png")} />
                <AvatarChecked source={require("../../assets/avatar3.png")} />
              </View>

              <Text className="text-neutros-negro-80 text-center font-poppins-medium text-[13px]">
                Si no lo tienes claro, aquí tienes unos ejemplos.
              </Text>
              <View className="justify-center items-center">
                <CustomButton
                  onPress={pickImage}
                  title="Subir Foto"
                  width="content"
                />
              </View>
            </View>
          </View>

          {/* Navigation Button Set */}
          <View className="flex-row items-center justify-between mt-12">
            <CustomButton
              title="Atrás"
              onPress={() => navigation.goBack()}
              width="content"
              isBackButton
            />
            <CustomButton
              title="Siguiente"
              onPress={() => navigation.navigate("RegisterStep3")}
              variant="white"
              width="content"
            />
          </View>
        </View>
      </View>

      {visible && (
        <Animated.View
          style={{
            opacity: opacity,
            backgroundColor: "rgba(144, 145, 146, 0.6)",
          }}
          className="absolute w-full h-screen flex-1 justify-center px-4"
        >
          <View
            className="bg-white p-[24px] rounded-[8px]"
            style={{
              shadowColor: "#212121",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.4,
              shadowRadius: 4,
            }}
          >
            <View className="mb-[24px]">
              <Text className="mb-[8px] text-neutral-color-gray-900 font-poppins-semibold text-[24px]">
                Como escoger una gran foto
              </Text>
              <View className="gap-5">
                <Text className="text-[15px] font-poppins-regular text-neutral-color-blue-gray-500">
                  Preferentemente no escojas fotos donde tengas que recortar a
                  otras personas.
                </Text>
                <Text className="text-[15px] font-poppins-regular text-neutral-color-blue-gray-500">
                  Tu cara debe estar en el centro y bien enfocada.
                </Text>
                <Text className="text-[15px] font-poppins-regular text-neutral-color-blue-gray-500">
                  Un fondo limpio y sin distracciones hará que te destaques más.
                </Text>
                <Text className="text-[15px] font-poppins-regular text-neutral-color-blue-gray-500">
                  Mantén la edición de la foto al mínimo.
                </Text>
                <Text className="text-[15px] font-poppins-regular text-neutral-color-blue-gray-500">
                  Asegúrate de que la foto sea reciente y refleje cómo te ves
                  actualmente.
                </Text>
              </View>
            </View>
            <View className="items-end">
              <CustomButton
                onPress={toggleDialog}
                title="Entiendo"
                width="content"
              />
            </View>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
