import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { useProfile } from "../profile/ProfileContext";
import { useUser } from "../user/UserContext";
import { CustomButton } from "./CustomButton";
import { CustomTextarea } from "./CustomTextarea";
import { InputFieldWithIcon } from "./InputFieldWithIcon";
import { CustomRadio } from "./CustomRadio";
import { CustomChip } from "./CustomChip";
import { CustomDropdown } from "./CustomDropdown";
import { daysOfTheWeek } from "../data/data";
import { formatDate } from "../utils/formatDate";
import { getScreenSize } from "../utils/screenSize";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import apiClient from "../api/apiClient";

export const EditProfile = ({ onRequestClose, visible, profileImage }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const { profileData, setProfileData } = useProfile();
  const { userData } = useUser();

  const categories = [
    { label: "Animales", active: false },
    { label: "Ayuda", active: false },
    { label: "Consultoría", active: false },
    { label: "Diseño", active: false },
    { label: "Idiomas", active: false },
    { label: "Informática", active: false },
    { label: "Reparaciones", active: false },
    { label: "Salud", active: false },
    { label: "Tutorías", active: false },
    { label: "Otros", active: false },
  ];

  const [allCategories, setAllCategories] = useState(
    categories.map((category) => ({
      ...category,
      active: profileData.interestedSkills?.includes(category.label) || false,
    })),
  );

  useEffect(() => {
    setValue(
      "interestedSkills",
      allCategories
        .filter((category) => category.active)
        .map((cat) => cat.label),
    );
  }, [allCategories, setValue]);

  const [savedDate, setSavedDate] = useState("00/00/00");

  const fetchSavedDate = async () => {
    try {
      const savedData = await AsyncStorage.getItem("formData");
      if (savedData) {
        const { timestamp } = JSON.parse(savedData);
        setSavedDate(timestamp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavedDate();
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: profileData.description || "",
      location: profileData.location || "",
      profilePicture: null,
      preferredTimeRange: profileData.preferredTimeRange || null,
      selectedDays: profileData.selectedDays || [],
      interestedSkills: profileData.interestedSkills || [],
    },
    mode: "onChange",
  });

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

  const toggleCategory = (label, onChange) => {
    const activeCount = allCategories.filter(
      (category) => category.active,
    ).length;

    if (
      !allCategories.find((category) => category.label === label).active &&
      activeCount >= 3
    ) {
      alert("Solo puedes seleccionar hasta 3 categorías.");
      return;
    }

    setAllCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.label === label
          ? { ...category, active: !category.active }
          : category,
      ),
    );

    const updatedSkills = allCategories
      .filter(
        (category) =>
          category.active || (category.label === label && activeCount < 3),
      )
      .map((category) => category.label);

    onChange(updatedSkills);
  };

  const profileId = profileData._id;

  const onImageSubmit = async (data) => {
    const userId = userData._id;
    const imageUri = data.profilePicture;

    if (!imageUri) {
      alert("No image selected!");
      return;
    }

    const fileType = imageUri.endsWith(".png") ? "image/png" : "image/jpeg";
    const formData = new FormData();
    formData.append("id_user", userId);
    formData.append("image_profile", {
      uri: imageUri,
      name: `profile.${fileType === "image/png" ? "png" : "jpg"}`,
      type: fileType,
    });

    try {
      await apiClient.patch(
        `/upload-service/profile-image-user/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      alert("¡La imagen cargada con éxito!");
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  const onSubmit = async (data) => {
    const timestamp = formatDate(new Date());
    const formData = {
      description: data.description,
      location: data.location,
      profilePicture: null,
      preferredTimeRange: data.preferredTimeRange,
      selectedDays: data.selectedDays,
      interestedSkills: data.interestedSkills,
      timestamp,
    };

    try {
      await AsyncStorage.setItem("formData", JSON.stringify(formData));
      await apiClient.patch(`/profile/${profileId}`, data);
      setProfileData({
        ...profileData,
        data,
      });
      alert("¡Perfil editado con éxito!");

      onRequestClose();
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        alert("Se ha producido un error, intenta de nuevo.");
      } else {
        console.error(error.message);
        alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View
        className={`
          absolute w-full h-screen flex-1 justify-center bg-neutros-gris-fondo
          ${isSmallScreen ? "pt-8" : "pt-16"} 
          `}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Go Back Button */}
          <View className="bg-neutros-gris-fondo w-full py-2 flex-row justify-start items-center">
            <TouchableOpacity
              onPress={onRequestClose}
              className={`${isBigScreen ? "h-[42px]" : isSmallScreen ? "h-[30px]" : "h-[36px]"}  flex-row items-center justify-center pl-[8px] pr-[16px]`}
            >
              <View className="mr-[8px]">
                <Feather
                  name="chevron-left"
                  size={isSmallScreen ? 24 : 28}
                  color="#696868"
                />
              </View>
              <Text
                className={`font-roboto-medium ${isSmallScreen ? "text-[20px]" : "text-[22px]"} text-neutros-negro`}
              >
                Editar perfil
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View className="bg-terciario-celeste rounded-lg mx-4 mt-2 px-4 py-3">
            <View className="flex-row items-center gap-4">
              <MaterialIcons name="info-outline" size={15} color="#696868" />
              <Text className="text-sm text-neutros-negro font-roboto-medium">
                {`Última actualización: ${savedDate || "00/00/00"}`}
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View
            className={`
              bg-[#f7f7f7] rounded-lg px-4
              ${isSmallScreen ? "pt-3 pb-4 mx-4 my-2" : "py-3 m-4"}
              `}
          >
            {/* Descripción... */}
            <View className="mt-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  className={`
                    text-neutral-color-gray-900 font-roboto-medium 
                    ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-lg"}
                    `}
                >
                  Descripción del usuario
                </Text>
              </View>
              <Controller
                control={control}
                name="description"
                rules={{
                  maxLength: {
                    value: 160,
                    message: "Máximo 160 caracteres",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextarea
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    // placeholder="Soy una joven estudiante de enfermería, tengo 22 años vivo en Madrid con unas amigas. Soy una apasionada por la música, y que desea aprender a tocar el piano."
                    multiline={true}
                    numberOfLines={7}
                    maxLength={160}
                    height={146}
                  />
                )}
              />
            </View>

            {/* Postal Code */}
            <View className={`${isBigScreen ? "mt-6" : "mt-4"}`}>
              <Controller
                control={control}
                name="location"
                rules={{
                  pattern: {
                    value: /^[0-9]{5}$/,
                    message: "El código postal debe ser de 5 dígitos",
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <InputFieldWithIcon
                    label="Ubicación"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Código postal (CP)"
                    iconName="envelope"
                    error={error}
                  />
                )}
              />
              <Text
                className={`
              text-neutros-negro-80 font-roboto-regular text-xs
              ${errors.location ? "text-red-error" : "text-neutros-negro-80"}
              `}
              >
                Introduce tu código postal (5 dígitos) para identificar tu
                ubicación.
              </Text>
            </View>

            {/* Foto */}
            <View className="flex-row justify-between items-center mt-4 mb-2">
              <Text
                className={`
                  text-neutral-color-gray-900 font-roboto-medium 
                  ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-lg"}
                  `}
              >
                Foto de perfil
              </Text>
            </View>
            <View className="justify-center items-center mb-8">
              <TouchableOpacity
                onPress={pickImage}
                className={`
                relative rounded-full
                ${isSmallScreen ? "h-[98px] w-[98px]" : "h-[124px] w-[120px]"}
                `}
              >
                <Controller
                  control={control}
                  name="profilePicture"
                  render={({ field: { value } }) => (
                    <>
                      {value ? (
                        <Image
                          source={{ uri: value }}
                          style={{
                            width: isSmallScreen ? 100 : 120,
                            height: isSmallScreen ? 100 : 120,
                            borderRadius: isSmallScreen ? 50 : 60,
                          }}
                        />
                      ) : (
                        <Image
                          source={{ uri: profileImage }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                          className="rounded-full"
                        />
                      )}
                    </>
                  )}
                />
              </TouchableOpacity>
              <View className="absolute -bottom-6">
                <CustomButton
                  onPress={handleSubmit(onImageSubmit)}
                  title="Editar Foto"
                  width="content"
                />
              </View>
            </View>

            {/* Disponibilidad */}
            <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
              <Text
                className={`
                  text-neutros-negro font-roboto-medium 
                  ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-lg"}
                  `}
              >
                Disponibilidad horaria
              </Text>
              <Controller
                control={control}
                name="preferredTimeRange"
                render={({ field: { onChange, value } }) => (
                  <View
                    className={`
        flex flex-wrap flex-row mt-2
        ${isSmallScreen ? "justify-start" : "justify-between"}
      `}
                  >
                    <View
                      className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="08:00 a 14:00"
                        isSelected={value === "08:00 a 14:00"}
                        onPress={() => onChange("08:00 a 14:00")}
                      />
                    </View>

                    <View
                      className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="15:00 a 17:00"
                        isSelected={value === "15:00 a 17:00"}
                        onPress={() => onChange("15:00 a 17:00")}
                      />
                    </View>

                    <View
                      className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="17:00 a 21:00"
                        isSelected={value === "17:00 a 21:00"}
                        onPress={() => onChange("17:00 a 21:00")}
                      />
                    </View>

                    <View
                      className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="08:00 a 17:00"
                        isSelected={value === "08:00 a 17:00"}
                        onPress={() => onChange("08:00 a 17:00")}
                      />
                    </View>

                    <View
                      className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="Horario flexible"
                        isSelected={value === "Horario flexible"}
                        onPress={() => onChange("Horario flexible")}
                      />
                    </View>
                  </View>
                )}
              />
            </View>

            {/* Días */}
            <View
              className={`
                ${isSmallScreen ? "mt-1" : "mt-4"}
                flex-grow mb-1
                `}
            >
              <Text
                className={`
                  text-neutros-negro font-roboto-medium 
                  ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-lg"}
                  `}
              >
                Días
              </Text>
              <Text
                className={`
                  text-neutros-negro-80 font-roboto-medium text-sm
                  ${isSmallScreen ? "mb-2" : "mb-4"}
                  `}
              >
                Puedes seleccionar más de un día.
              </Text>
              <Controller
                control={control}
                name="selectedDays"
                render={({ field: { onChange, value } }) => (
                  <CustomDropdown
                    label="Seleccionar días"
                    items={daysOfTheWeek}
                    backgroundColor={"bg-neutros-blanco"}
                    selectedItems={value}
                    onItemsChange={(selectedDays) => onChange(selectedDays)}
                  />
                )}
              />
            </View>

            {/* ¿Qué te gustaría...? */}
            <View className={`${isSmallScreen ? "mt-2" : "mt-4"} mb-2`}>
              <Text
                className={`
                  text-neutros-negro font-roboto-medium 
                  ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-lg"}
                  `}
              >
                ¿Qué te gustaría aprender?
              </Text>
              <Text className="my-2 text-neutros-negro-80 font-roboto-medium text-sm">
                Puedes seleccionar hasta 3 categorías.
              </Text>
              <Controller
                control={control}
                name="interestedSkills"
                render={({ field: { onChange, value } }) => (
                  <View className="flex flex-wrap flex-row justify-start align-center gap-2 mt-1">
                    {allCategories.map((category) => (
                      <TouchableOpacity
                        key={category.label}
                        onPress={() => toggleCategory(category.label, onChange)}
                      >
                        <CustomChip
                          label={category.label}
                          status={category.active ? "active" : "inactive"}
                          color={category.active ? "blue" : "white"}
                          iconName={category.active ? "close" : null}
                          showBorder
                          onIconPress={() =>
                            toggleCategory(category.label, onChange)
                          }
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              />
            </View>
          </View>
          {/* Save and Exit */}
          <View
            className={`
            mx-4 mt-2
            ${isSmallScreen ? "mb-2" : "mb-10"}
            `}
          >
            <View className="flex-row justify-end">
              <CustomButton
                onPress={handleSubmit(onSubmit)}
                title={"Guardar"}
                width="content"
                variant="white"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
