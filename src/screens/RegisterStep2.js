import { useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Animated,
  Easing,
  Image,
} from "react-native";
import StepHeader from "../components/StepHeader";
import CustomChip from "../components/CustomChip";
import Stepper from "../components/Stepper";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import ImageIcon from "../components/svgComponents/ImageIcon";
import AvatarChecked from "../components/AvatarChecked";
import * as ImagePicker from "expo-image-picker";

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
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white px-4">
        <View className="flex-grow">
          <View className="flex-1 mb-5">
            <StepHeader title="Una foto vale más que mil palabras" />

            <View className="px-4">
              <Stepper step="2" />

              <View className="mt-[20px] w-full flex-row justify-between items-center">
                <CustomChip label={"Tu foto"} status="active" />
                <CustomChip label={"Disponibilidad"} status="inactive" />
              </View>
            </View>
          </View>

          <Text className="text-primarios-violeta-100 text-h font-roboto-regular mb-[20px]">
            Paso 2
          </Text>

          <View className="gap-[20px]">
            <View>
              <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px] mb-[8px]">
                Escoger una foto
              </Text>
              <Text className="text-neutral-color-blue-gray-500 font-poppins-medium text-[16px]">
                En HelpHub, todas las personas deben tener una fotografía en
                donde se muestre claramente su rostro.
              </Text>
            </View>

            <View className="justify-center align-center border-[1px] border-neutral-color-blue-gray-100 rounded-[8px] gap-[12px] px-[79px] py-[11px]">
              {selectedImage ? (
                <View className="justify-center items-center">
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 57, height: 57 }}
                  />
                </View>
              ) : (
                <View className="justify-center items-center">
                  <ImageIcon />
                </View>
              )}
              <View className="gap-[10px] w-full self-end">
                <Text className="text-neutros-negro text-center font-roboto-regular text-[24px]">
                  Subir foto
                </Text>
                <Text className="text-neutros-negro-80 text-center font-roboto-medium text-[16px]">
                  Selecciona una foto de perfil de tu equipo.
                </Text>
              </View>
              <View className="justify-center items-center">
                <CustomButton
                  onPress={pickImage}
                  title="Subir Foto"
                  width="content"
                />
              </View>
            </View>

            <View className="flex-row gap-1">
              <Text className="text-neutral-color-blue-gray-400 font-poppins-medium text-[13px]">
                Si no lo tienes claro, aquí tienes unos ejemplos:
              </Text>
              <Pressable onPress={toggleDialog}>
                <Ionicons name="information-circle" size={19} color="#90a3ae" />
              </Pressable>
            </View>

            <View className="flex-row justify-between gap-2 items-center pt-6 px-14">
              <AvatarChecked source={require("../../assets/avatar1.png")} />
              <AvatarChecked source={require("../../assets/avatar2.png")} />
              <AvatarChecked source={require("../../assets/avatar3.png")} />
            </View>
          </View>

          <View className="flex-row items-center justify-between mt-12">
            <CustomButton
              title="Atrás"
              onPress={() => navigation.navigate("RegisterStep1")}
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
      </ScrollView>

      {visible && (
        <Animated.View
          style={{
            opacity: opacity,
            backgroundColor: "rgba(144, 145, 146, 0.6)",
          }}
          className="absolute w-full h-screen flex-1 px-4"
        >
          <View className="bg-white top-[160px] p-[24px] rounded-[8px]">
            <View className="mb-[24px]">
              <Text className="mb-[8px] text-neutral-color-gray-900 font-poppins-regular font-bold text-[24px]">
                Como escoger una gran foto
              </Text>
              <Text className="text-[16px] font-poppins-regular text-neutral-color-blue-gray-500">
                Preferentemente no escojas fotos donde tengas que recortar a
                otras personas. Tu cara debe estar en el centro y bien enfocada.
                Un fondo limpio y sin distracciones hará que te destaques más.
                Mantén la edición de la foto al mínimo. Asegúrate de que la foto
                sea reciente y refleje cómo te ves actualmente.
              </Text>
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
