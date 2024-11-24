import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Animated,
  Easing,
  Image,
} from "react-native";
import {
  StepHeader,
  CustomButton,
  StepTitle,
  UserCircle,
  AvatarChecked,
} from "../components";
import { useUser } from "../user/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { getScreenSize } from "../utils/screenSize";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import apiClient from "../api/apiClient";

export default function RegisterStep2({ navigation }) {
  const { isSmallScreen, isBigScreen } = getScreenSize();
  const { userData, setUserData } = useUser();
  const userId = userData._id;
  const [fetchedImageUri, setFetchedImageUri] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      profilePicture: null,
    },
  });

  const imageValue = watch("profilePicture");

  const fetchProfileImage = async (userId) => {
    try {
      const response = await apiClient.get(
        `/upload-service/profile-imageByUser/${userId}`,
        { responseType: "blob" },
      );
      const imageUrl = URL.createObjectURL(response.data);
      setImageUri(imageUrl);
      setFetchedImageUri(imageUrl);
    } catch (error) {
      // console.error("Error fetching profile image:", error.message);
      setImageUri(null);
    }
  };

  useEffect(() => {
    fetchProfileImage(userId);
  }, []);

  const onSubmit = async (data) => {
    const imageUri = data.profilePicture;

    const fileType = imageUri.endsWith(".png") ? "image/png" : "image/jpeg";
    const formData = new FormData();
    formData.append("id_user", userId);
    formData.append("image_profile", {
      uri: imageUri,
      name: `profile.${fileType === "image/png" ? "png" : "jpg"}`,
      type: fileType,
    });

    setUserData({
      ...userData,
      profilePicture: imageUri,
    });

    if (fetchedImageUri === null) {
      try {
        await apiClient.post("/upload-service/upload-profileImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        navigation.navigate("RegisterStep3");
      } catch (error) {
        console.error(error.message);
        alert("Se ha producido un error, intenta de nuevo.");
      }
    } else {
      try {
        await apiClient.patch(
          `/upload-service/profile-image-user/${userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        navigation.navigate("RegisterStep3");
      } catch (error) {
        console.error(error.message);
        alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

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
      setValue("profilePicture", result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 px-4">
        <View className="flex-1 justify-between">
          <View>
            <StepHeader
              step={"2"}
              statusStepLabel1={"active"}
              statusStepLabel2={"inactive"}
              label1={"Tu foto"}
              label2={"Disponibilidad"}
              status1={"active"}
              status2={"inactive"}
            />
            <StepTitle
              title="Paso 2"
              subtitle="Una foto vale más que mil palabras"
            />

            <View
              className={`
                ${isBigScreen ? "gap-[22px]" : isSmallScreen ? "gap-[18px]" : "gap-[20px]"} 
                mt-1
                `}
            >
              <View>
                <View
                  className={`
                    flex-row justify-between items-center mr-3
                    ${isSmallScreen ? "mb-[3px]" : "mb-2"}
                    `}
                >
                  <Text
                    className={`
                      text-neutros-negro font-roboto-medium 
                      ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-xl"}
                      `}
                  >
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
                    <Text className="uppercase text-primarios-celeste-100 text-xs font-roboto-bold">
                      Consejos
                    </Text>
                  </Pressable>
                </View>
                <Text
                  className={`
                    text-neutros-negro-80 leading-6 font-roboto-regular 
                    ${isSmallScreen ? "text-sm" : "text-base"}
                    `}
                >
                  En HelpHub, todas las personas deben tener una fotografía en
                  donde se muestre claramente su rostro.
                </Text>
              </View>

              <View className="justify-center items-center">
                <View className="relative">
                  <Controller
                    control={control}
                    name="profilePicture"
                    render={({ field: { value } }) => (
                      <>
                        {value ? (
                          <>
                            <Image
                              source={{ uri: value }}
                              style={{
                                width: isSmallScreen ? 100 : 120,
                                height: isSmallScreen ? 100 : 120,
                                borderRadius: isSmallScreen ? 50 : 60,
                              }}
                            />
                            <View className="absolute right-1 top-1 bg-primarios-violeta-100 h-[22px] w-[22px] rounded-full border-[1px] border-white justify-center items-center">
                              <Feather name="check" size={14} color="white" />
                            </View>
                          </>
                        ) : fetchedImageUri ? (
                          <>
                            <Image
                              source={{ uri: fetchedImageUri }}
                              style={{
                                width: isSmallScreen ? 100 : 120,
                                height: isSmallScreen ? 100 : 120,
                                borderRadius: isSmallScreen ? 50 : 60,
                              }}
                            />
                            <View className="absolute right-1 top-1 bg-primarios-violeta-100 h-[22px] w-[22px] rounded-full border-[1px] border-white justify-center items-center">
                              <Feather name="check" size={14} color="white" />
                            </View>
                          </>
                        ) : (
                          <UserCircle />
                        )}
                      </>
                    )}
                  />
                </View>
                <View className="absolute -bottom-6">
                  <CustomButton
                    onPress={pickImage}
                    title="Subir Foto"
                    width="content"
                  />
                </View>
              </View>

              <View>
                <View
                  className={`
                    self-center flex-row justify-between items-center 
                    ${isSmallScreen ? "w-[50%] pt-5" : "w-[65%] pt-6"}
                    `}
                >
                  <AvatarChecked source={require("../../assets/avatar1.png")} />
                  <AvatarChecked source={require("../../assets/avatar2.png")} />
                  <AvatarChecked source={require("../../assets/avatar3.png")} />
                </View>

                <Text className="mt-2 text-neutros-negro-80 text-center font-roboto-medium text-sm">
                  Si no lo tienes claro, aquí tienes unos ejemplos.
                </Text>
              </View>
            </View>
          </View>

          <View
            className={`
              flex-row items-center justify-between 
              ${isSmallScreen ? "mt-auto mb-2" : "mt-8"}
              `}
          >
            <CustomButton
              title="Atrás"
              onPress={() => navigation.goBack()}
              width="content"
              isBackButton
            />
            <CustomButton
              title="Continuar"
              onPress={handleSubmit(onSubmit)}
              variant="white"
              width="content"
              disabled={!fetchedImageUri && !imageValue}
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
              <Text
                className={`text-neutral-color-gray-900 font-poppins-semibold w-[90%] ${isBigScreen ? "text-[26px] mb-[12px]" : isSmallScreen ? "text-[22px] mb-[8px]" : "text-[24px] mb-[8px]"}`}
              >
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
