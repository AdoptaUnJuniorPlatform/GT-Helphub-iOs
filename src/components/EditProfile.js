import { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "./CustomButton";
import CustomTextarea from "./CustomTextarea";
import CustomRadio from "./CustomRadio";
import CustomDropdown from "./CustomDropdown";
import { categories } from "../data/data";

const { width } = Dimensions.get("window");

const EditProfile = ({ onRequestClose, visible, navigation }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");
  const [ability, setAbility] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleLevelChange = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View
        className={`absolute w-full h-screen flex-1 justify-center ${isSmallScreen ? "pt-8" : "pt-16"} bg-white`}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Go Back Button */}
          <View className="bg-[#fbfbff] w-full py-2 flex-row justify-start items-center">
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
                Volver
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <View
            className={`bg-[#f7f7f7] rounded-[8px] ${isSmallScreen ? "pt-3 pb-4 px-4 mx-4 my-2" : "p-4 m-4"}`}
          >
            {/* Título... */}
            <View className="mt-1">
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-[20px]"}`}
                >
                  Título de tu publicación
                </Text>
              </View>
              <View className={`${isSmallScreen ? "mt-0" : "mt-2"}`}>
                <CustomTextarea
                  value={title}
                  onChange={setTitle}
                  placeholder={"Ej: Pintar óleo"}
                  multiline={false}
                  numberOfLines={1}
                  maxLength={20}
                />
              </View>
            </View>

            {/* Nivel */}
            <View className="mt-4">
              <Text
                className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-[20px]"}`}
              >
                Nivel
              </Text>
              <View
                className={`flex flex-wrap flex-row justify-start ${isSmallScreen ? "mt-1" : "mt-2"}`}
              >
                <View className="mr-2 w-auto mb-2">
                  <CustomRadio
                    label="Básico"
                    isSelected={level === "Básico"}
                    onPress={() => handleLevelChange("Básico")}
                  />
                </View>
                <View className="mr-2 w-auto mb-2">
                  <CustomRadio
                    label="Medio"
                    isSelected={level === "Medio"}
                    onPress={() => handleLevelChange("Medio")}
                  />
                </View>
                <View className="mr-2 w-auto mb-2">
                  <CustomRadio
                    label="Avanzado"
                    isSelected={level === "Avanzado"}
                    onPress={() => handleLevelChange("Avanzado")}
                  />
                </View>
              </View>
            </View>

            {/* Modalidad */}
            <View className="mt-2">
              <Text
                className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-[20px]"}`}
              >
                Modalidad
              </Text>
              <View className="flex flex-wrap flex-row justify-start mt-2">
                <View className="mr-2 w-auto mb-2">
                  <CustomRadio
                    label="Online"
                    isSelected={mode === "Online"}
                    onPress={() => handleModeChange("Online")}
                  />
                </View>
                <View className="mr-2 w-auto mb-2">
                  <CustomRadio
                    label="Presencial"
                    isSelected={mode === "Presemcial"}
                    onPress={() => handleModeChange("Presemcial")}
                  />
                </View>
              </View>
            </View>

            {/* ¿Qué ofreces? */}
            <View className="mt-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-[20px]"}`}
                >
                  ¿Qué ofreces?
                </Text>
              </View>

              <CustomTextarea
                value={ability}
                onChange={setAbility}
                placeholder={
                  "Ej: Clases de pintura al óleo desde cero. Nivel inicial y avanzado."
                }
                multiline={true}
                numberOfLines={7}
                maxLength={160}
                height={100}
              />
            </View>

            {/* ¿Qué categoría...? */}
            <View className={`${isSmallScreen ? "mt-3" : "mt-4"} flex-grow`}>
              <Text
                className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px] mb-[8px]" : isSmallScreen ? "text-[16px] mb-[5px]" : "text-[20px] mb-[8px]"}`}
              >
                ¿Qué categoría se ajusta mejor a tu habilidad?
              </Text>
              <View className="mt-1">
                <CustomDropdown
                  label="Categorías"
                  items={categories}
                  backgroundColor={"bg-[#fbfbff]"}
                />
              </View>
            </View>
          </View>
        </ScrollView>

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
      </View>
    </Modal>
  );
};

export default EditProfile;