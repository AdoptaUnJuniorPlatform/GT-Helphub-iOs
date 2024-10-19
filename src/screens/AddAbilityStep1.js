import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "../components/CustomButton";
import CustomTextarea from "../components/CustomTextarea";
import CustomRadio from "../components/CustomRadio";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const AddAbilityStep1 = ({ onRequestClose, visible, navigation }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [isDialogVisible, setDialogVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");

  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  const handleLevelChange = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <View
      className={`absolute w-full h-screen flex-1 justify-center ${isSmallScreen ? "pt-8" : "pt-16"} bg-white`}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Go Back Button */}
        <View className="bg-[#fbfbff] w-full py-2 flex-row justify-start items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
              Habilidades
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View className="bg-terciario-verde-fondo rounded-[8px] mx-4 mt-4 px-[20px] pt-[15px] pb-[10px]">
          <View className="flex-row items-center gap-4 mb-2">
            <AntDesign name="checkcircleo" size={24} color="#43A047" />
            <Text className="text-[14px] text-terciario-verde-oscuro font-roboto-medium">
              ¡Ya tienes 2 habilidades!
            </Text>
          </View>
          <Text className="text-[12px] text-terciario-verde-oscuro font-roboto-400">
            Sigue sumando habilidades para hacer crecer esta comunidad.
          </Text>
        </View>

        {/* Form Section */}
        <View
          className={`bg-[#f7f7f7] rounded-[8px] ${isSmallScreen ? "pt-3 pb-4 px-4 mx-4 my-2" : "p-4 m-4"}`}
        >
          {/* Info */}
          <View>
            <Text
              className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px] mb-[8px]" : isSmallScreen ? "text-[18px] mb-[4px]" : "text-[20px] mb-[5px]"}`}
            >
              Nueva habilidad
            </Text>
            <Text
              className={`text-neutral-color-blue-gray-500 ${isSmallScreen ? "" : "leading-6"} font-roboto-regular text-[16px]`}
            >
              Puedes agregar varias habilidades y editarlas más tarde.
            </Text>
          </View>

          {/* Título... */}
          <View className="mt-4">
            <View
              className={`flex-row justify-between items-center ${isBigScreen ? "mb-2" : isSmallScreen ? "" : "mb-1"}`}
            >
              <Text
                className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px] w-[35%] text-wrap" : isSmallScreen ? "text-[18px]" : "text-[20px] w-[35%] text-wrap"}`}
              >
                Título de tu publicación
              </Text>
              <TouchableOpacity
                onPress={toggleDialog}
                className={`${isBigScreen ? "h-[36px]" : ""} flex-row items-center justify-center rounded-[8px]`}
              >
                <Text className="uppercase font-roboto-bold text-[12px] text-primarios-celeste-100">
                  Ejemplos
                </Text>
                <View className="ml-2">
                  <Feather
                    name={isDialogVisible ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="#496CEB"
                  />
                </View>
              </TouchableOpacity>
            </View>

            {isDialogVisible && (
              <View className="rounded-[8px] bg-[#EEF1FF] p-[16px] my-2">
                <Text className="text-neutral-color-blue-gray-900 font-roboto-bold text-[16px] mb-3">
                  Ejemplos para crear tu título
                </Text>
                <Text
                  className={`text-neutros-negro-80 font-roboto-regular text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Sesión grupal de meditación al aire libre.
                </Text>
                <Text
                  className={`text-neutros-negro-80 font-roboto-regular text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Revisión de currículum vitae.
                </Text>
                <Text
                  className={`text-neutros-negro-80 font-roboto-regular text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Clases de cocina italiana tradicional.
                </Text>
                <Text
                  className={`text-neutros-negro-80 font-roboto-regular text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Entrenamiento personal en gimnasio.
                </Text>
              </View>
            )}

            <View className="mt-2">
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

          {/* Asterisc */}
          <View className="mt-2">
            <Text
              className={`text-neutral-color-blue-gray-500 font-roboto-italic ${isSmallScreen ? "text-[11px]" : "text-[13px]"} leading-5`}
            >
              Recomendamos una reunión online antes de un encuentro presencial
              por seguridad.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Siguiente */}
      <View className={`mx-4 ${isSmallScreen ? "mb-2" : "mb-10"} mt-2`}>
        <View className="flex-row justify-end">
          <CustomButton
            onPress={() => navigation.navigate("AddAbilityStep2")}
            title={"Siguiente"}
            width="content"
            variant="white"
          />
        </View>
      </View>
    </View>
    // </Modal>
  );
};

export default AddAbilityStep1;
