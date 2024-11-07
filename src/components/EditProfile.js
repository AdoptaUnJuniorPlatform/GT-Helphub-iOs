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

export const EditProfile = ({ onRequestClose, visible }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const { profileData, setProfileData } = useProfile();

  const [allCategories, setAllCategories] = useState([
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
  ]);

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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      description: "",
      location: "",
      profilePicture: null,
      preferredTimeRange: "",
      selectedDays: [],
      interestedSkills: [],
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
    setAllCategories((prevCategories) => {
      const activeCategories = prevCategories.filter(
        (category) => category.active,
      );

      if (
        activeCategories.length >= 3 &&
        !prevCategories.find((category) => category.label === label).active
      ) {
        return prevCategories;
      }

      const updatedCategories = prevCategories.map((category) =>
        category.label === label
          ? { ...category, active: !category.active }
          : category,
      );

      onChange(
        updatedCategories
          .filter((category) => category.active)
          .map((cat) => cat.label),
      );

      return updatedCategories;
    });
  };

  const profileId = profileData._id;

  const onSubmit = async (data) => {
    const timestamp = formatDate(new Date());
    const formData = { ...data, timestamp };

    try {
      await AsyncStorage.setItem("formData", JSON.stringify(formData));
      const response = await apiClient.patch(`/profile/${profileId}`, data);
      alert("¡Perfil editado con éxito!");
      setProfileData(response.data);
      onRequestClose(onRequestClose);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      } else {
        console.error(error.message);
        // alert("Se ha producido un error, intenta de nuevo.");
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
                  required: {
                    value: true,
                    message: "Descripción es obligatoria",
                  },
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
                    placeholder="Soy una joven estudiante de enfermería, tengo 22 años vivo en Madrid con unas amigas. Soy una apasionada por la música, y que desea aprender a tocar el piano."
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
                  required: {
                    value: true,
                    message: "Código postal es obligatorio",
                  },
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
              <View
                className={`
                relative rounded-full
                ${isSmallScreen ? "h-[98px] w-[98px]" : "h-[124px] w-[120px]"}
                `}
              >
                <Controller
                  control={control}
                  name="profilePicture"
                  rules={{
                    required: {
                      value: true,
                      message: "Foto es obligatorio",
                    },
                  }}
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
                          source={{ uri: profileData.profilePicture }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                          className="rounded-full"
                        />
                      )}
                    </>
                  )}
                />
              </View>
              <View className="absolute -bottom-6">
                <CustomButton
                  onPress={pickImage}
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
                rules={{
                  required: {
                    value: true,
                    message: "Disponibilidad horaria es obligatoria",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <View
                    className={`
        flex flex-wrap flex-row mt-2
        ${isSmallScreen ? "justify-start" : "justify-between"}
      `}
                  >
                    <View
                      className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="08:00hs a 14:00hs"
                        isSelected={value === "08:00hs a 14:00hs"}
                        onPress={() => onChange("08:00hs a 14:00hs")}
                      />
                    </View>

                    <View
                      className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="15:00hs a 17:00hs"
                        isSelected={value === "15:00hs a 17:00hs"}
                        onPress={() => onChange("15:00hs a 17:00hs")}
                      />
                    </View>

                    <View
                      className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="17:00hs a 21:00hs"
                        isSelected={value === "17:00hs a 21:00hs"}
                        onPress={() => onChange("17:00hs a 21:00hs")}
                      />
                    </View>

                    <View
                      className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="08:00hs a 21:00hs"
                        isSelected={value === "08:00hs a 21:00hs"}
                        onPress={() => onChange("08:00hs a 21:00hs")}
                      />
                    </View>

                    <View
                      className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                    >
                      <CustomRadio
                        label="Flexible schedule"
                        isSelected={value === "Flexible schedule"}
                        onPress={() => onChange("Flexible schedule")}
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
                rules={{
                  required: {
                    value: true,
                    message: "Días son obligatorios",
                  },
                }}
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
                rules={{
                  required: {
                    value: true,
                    message: "Categorías son obligatorias",
                  },
                }}
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
                disabled={!isValid}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
