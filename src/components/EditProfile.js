import { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomButton from "./CustomButton";
import CustomTextarea from "./CustomTextarea";
import InputFieldWithIcon from "./InputFieldWithIcon";
import UserCircle from "../components/svgComponents/UserCircle";
import CustomRadio from "./CustomRadio";
import CustomChip from "../components/CustomChip";
import CustomDropdown from "../components/CustomDropdown";
import { daysOfTheWeek } from "../data/data";

const { width } = Dimensions.get("window");

const EditProfile = ({ onRequestClose, visible }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [categoriesPop, setCategoriesPop] = useState([
    { label: "Idiomas", active: false },
    { label: "Fitness", active: false },
    { label: "Diseño", active: false },
    { label: "Tutorías", active: false },
    { label: "Ayuda", active: false },
    { label: "Animales", active: false },
    { label: "Bricolaje", active: false },
    { label: "Consultoría", active: false },
    { label: "Informática", active: false },
    { label: "Cuidado personal", active: false },
  ]);

  const [description, setDescription] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [image, setImage] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
      setImage(result.assets[0].uri);
    }
  };

  const handleTimeSlotChange = (selectedSlot) => {
    setTimeSlot(selectedSlot);
  };

  const toggleCategory = (label) => {
    setCategoriesPop((prevCategories) =>
      prevCategories.map((category) =>
        category.label === label
          ? { ...category, active: !category.active }
          : category,
      ),
    );
  };

  const deleteCategory = (label) => {
    setCategoriesPop((prevCategories) =>
      prevCategories.filter((category) => category.label !== label),
    );
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View
        className={`absolute w-full h-screen flex-1 justify-center ${isSmallScreen ? "pt-8" : "pt-16"} bg-neutros-gris-fondo`}
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
          <View className="bg-[#E5F6FD] rounded-[8px] mx-4 mt-2 px-4 py-3">
            <View className="flex-row items-center gap-4">
              <MaterialIcons name="info-outline" size={15} color="#696868" />
              <Text className="text-[14px] text-neutros-negro font-roboto-medium">
                Última actualización: 00/00/00
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View
            className={`bg-[#f7f7f7] rounded-[8px] ${isSmallScreen ? "pt-3 pb-4 mx-4 my-2" : "py-3 m-4"} px-4`}
          >
            {/* Descripción... */}
            <View className="mt-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-[20px]"}`}
                >
                  Descripción del usuario
                </Text>
              </View>
              <CustomTextarea
                value={description}
                onChange={setDescription}
                placeholder={
                  "Soy una joven estudiante de enfermería, tengo 22 años vivo en Madrid con unas amigas. Soy una apasionada por la música, y que desea aprender a tocar el piano."
                }
                multiline={true}
                numberOfLines={7}
                maxLength={160}
                height={146}
              />
            </View>

            {/* Postal Code */}
            <View className={`${isBigScreen ? "mt-6" : "mt-4"}`}>
              <InputFieldWithIcon
                label="Ubicación"
                value={postalCode}
                onChangeText={setPostalCode}
                placeholder="Código postal (CP)"
                iconName="envelope"
              />
              <Text className="text-neutros-negro-80 font-roboto-regular text-[12px]">
                Introduce tu código postal (5 dígitos) para identificar tu
                ubicación.
              </Text>
            </View>

            {/* Foto */}
            <View className="flex-row justify-between items-center mt-4 mb-2">
              <Text
                className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-[20px]"}`}
              >
                Foto de perfil
              </Text>
            </View>
            <View className="justify-center items-center mb-8">
              <View className="relative">
                {image ? (
                  <>
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: isSmallScreen ? 100 : 120,
                        height: isSmallScreen ? 100 : 120,
                        borderRadius: isSmallScreen ? 50 : 60,
                      }}
                    />
                  </>
                ) : (
                  <UserCircle />
                )}
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
                className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-[20px]"}`}
              >
                Disponibilidad horaria
              </Text>
              <View
                className={`flex flex-wrap flex-row ${isSmallScreen ? "justify-start" : "justify-between"} mt-2`}
              >
                <View
                  className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                >
                  <CustomRadio
                    label="8:00hs a 14:00hs"
                    isSelected={timeSlot === "8:00hs a 14:00hs"}
                    onPress={() => handleTimeSlotChange("8:00hs a 14:00hs")}
                  />
                </View>
                <View
                  className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                >
                  <CustomRadio
                    label="15:00hs a 17:00hs"
                    isSelected={timeSlot === "15:00hs a 17:00hs"}
                    onPress={() => handleTimeSlotChange("15:00hs a 17:00hs")}
                  />
                </View>
                <View
                  className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                >
                  <CustomRadio
                    label="17:00hs a 21:00hs"
                    isSelected={timeSlot === "17:00hs a 21:00hs"}
                    onPress={() => handleTimeSlotChange("17:00hs a 21:00hs")}
                  />
                </View>
                <View
                  className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                >
                  <CustomRadio
                    label="8:00hs a 17:00hs"
                    isSelected={timeSlot === "8:00hs a 17:00hs"}
                    onPress={() => handleTimeSlotChange("8:00hs a 17:00hs")}
                  />
                </View>
                <View
                  className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                >
                  <CustomRadio
                    label="Horario flexible"
                    isSelected={timeSlot === "Horario flexible"}
                    onPress={() => handleTimeSlotChange("Horario flexible")}
                  />
                </View>
              </View>
            </View>

            {/* Días */}
            <View
              className={`${isSmallScreen ? "mt-1" : "mt-4"} flex-grow mb-1`}
            >
              <Text
                className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-[20px]"}`}
              >
                Días
              </Text>
              <Text
                className={`text-neutros-negro-80 ${isSmallScreen ? "mb-2" : "mb-4"} font-roboto-medium text-[14px]`}
              >
                Puedes seleccionar más de un día.
              </Text>
              <CustomDropdown
                label="Seleccionar días"
                items={daysOfTheWeek}
                backgroundColor={"bg-[#fbfbff]"}
              />
            </View>

            {/* ¿Qué te gustaría...? */}
            <View className={`${isSmallScreen ? "mt-2" : "mt-4"} mb-2`}>
              <Text
                className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-[20px]"}`}
              >
                ¿Qué te gustaría aprender?
              </Text>
              <Text className="my-2 text-neutros-negro-80 font-roboto-medium text-[14px]">
                Puedes seleccionar hasta 3 categorías
              </Text>
              <View className="flex flex-wrap flex-row justify-start align-center gap-2 mt-1">
                {categoriesPop.map((category) => (
                  <TouchableOpacity
                    key={category.label}
                    onPress={() => toggleCategory(category.label)}
                  >
                    <CustomChip
                      label={category.label}
                      status={category.active ? "active" : "inactive"}
                      color={category.active ? "blue" : "white"}
                      iconName={category.active ? "close" : null}
                      showBorder
                      onIconPress={() => deleteCategory(category.label)}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          {/* Save and Exit */}
          <View className={`mx-4 ${isSmallScreen ? "mb-2" : "mb-10"} mt-2`}>
            <View className="flex-row justify-end">
              <CustomButton
                onPress={() => console.log("save and navigate to profile")}
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

export default EditProfile;
