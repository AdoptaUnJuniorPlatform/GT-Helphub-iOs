import { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  CustomButton,
  StepHeader,
  StepTitle,
  CustomRadio,
  CustomTextarea,
} from "../components";
import Feather from "@expo/vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function RegisterStep4_1({ navigation }) {
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
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 bg-neutros-gris-fondo px-4"
        >
          <StepHeader
            step={"4"}
            statusStepLabel1={"active"}
            statusStepLabel2={"inactive"}
            label1={"Mis habilidades"}
            label2={"Que quiero aprender"}
            status1={"active"}
            status2={"inactive"}
          />

          <StepTitle title={"Paso 4"} subtitle={"¡Ya casi estamos!"} />

          {/* Carga... */}
          <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
            <Text
              className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px] mb-[8px]" : isSmallScreen ? "text-[18px] mb-[3px]" : "text-[20px] mb-[5px]"}`}
            >
              Añade tu primera habilidad
            </Text>

            <Text
              className={`text-neutros-negro-80 ${isSmallScreen ? "" : "leading-6"} font-roboto-regular text-[16px]`}
            >
              Puedes agregar varias habilidades y editarlas más tarde.
            </Text>
          </View>

          {/* Título... */}
          <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
            <View
              className={`flex-row justify-between items-center ${isBigScreen ? "mb-2" : isSmallScreen ? "" : "mb-1"}`}
            >
              <Text
                className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px] w-[35%] text-wrap" : isSmallScreen ? "text-[18px]" : "text-[20px]"}`}
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
                  className={`text-neutros-negro-80 font-poppins-medium text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Sesión grupal de meditación al aire libre.
                </Text>
                <Text
                  className={`text-neutros-negro-80 font-poppins-medium text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Revisión de currículum vitae.
                </Text>
                <Text
                  className={`text-neutros-negro-80 font-poppins-medium text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Clases de cocina italiana tradicional.
                </Text>
                <Text
                  className={`text-neutros-negro-80 font-poppins-medium text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
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
          <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
            <Text
              className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[18px]" : "text-[20px]"}`}
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
          <View className={`${isSmallScreen ? "mt-0" : "mt-3"}`}>
            <Text
              className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[18px]" : "text-[20px]"}`}
            >
              Modalidad
            </Text>
            <View
              className={`flex flex-wrap flex-row justify-start ${isSmallScreen ? "mt-1" : "mt-2"}`}
            >
              <View
                className={`mr-2 w-auto ${isSmallScreen ? "mb-1" : "mb-2"}`}
              >
                <CustomRadio
                  label="Online"
                  isSelected={mode === "Online"}
                  onPress={() => handleModeChange("Online")}
                />
              </View>
              <View
                className={`mr-2 w-auto ${isSmallScreen ? "mb-1" : "mb-2"}`}
              >
                <CustomRadio
                  label="Presencial"
                  isSelected={mode === "Presemcial"}
                  onPress={() => handleModeChange("Presemcial")}
                />
              </View>
            </View>
          </View>

          {/* Asterisc */}
          <View>
            <Text
              className={`text-neutros-negro font-roboto-italic ${isSmallScreen ? "text-[9px]" : "text-[13px] leading-5"}`}
            >
              Recomendamos una reunión online antes de un encuentro presencial
              por seguridad.
            </Text>
          </View>
        </ScrollView>

        {/* Navigation Button Set */}
        <View
          className={`absolute ${isSmallScreen ? "pb-2" : ""} bottom-0 left-0 right-0 px-4 pt-2 bg-neutros-gris-fondo flex-row items-center justify-between`}
        >
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
            width="content"
            isBackButton
          />
          <CustomButton
            title="Continuar"
            onPress={() => navigation.navigate("RegisterStep4_2")}
            variant="white"
            width="content"
            disabled={!title || !level || !mode}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
