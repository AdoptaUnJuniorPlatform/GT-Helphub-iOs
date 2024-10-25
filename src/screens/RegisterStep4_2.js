import { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import CustomDropdown from "../components/CustomDropdown";
import StepTitle from "../components/StepTitle";
import CustomTextarea from "../components/CustomTextarea";
import { categories } from "../data/data";
import Feather from "@expo/vector-icons/Feather";
import CelebrateIcon from "../components/svgComponents/CelebrateIcon";
import CustomChip from "../components/CustomChip";

const { width } = Dimensions.get("window");

export default function RegisterStep1({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [ability, setAbility] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible);
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

          <View className="flex-1">
            <View>
              {/* ¿Qué ofreces? */}
              <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
                <View className="flex-row justify-between items-center mb-2">
                  <Text
                    className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[18px]" : "text-[20px]"}`}
                  >
                    ¿Qué ofreces?
                  </Text>
                  <TouchableOpacity
                    onPress={toggleDialog}
                    className="h-[36px] flex-row items-center justify-center rounded-[8px]"
                  >
                    <Text className="uppercase font-roboto-bold text-[12px] text-primarios-celeste-100">
                      Consejos
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
                  <View className="rounded-[8px] bg-[#EEF1FF] p-[16px] mb-4">
                    <Text className="text-neutral-color-blue-gray-900 font-roboto-bold text-[16px] mb-3">
                      Como generar un texto llamativo
                    </Text>
                    <Text
                      className={`text-neutros-negro-80 font-poppins-medium text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                    >
                      Asegúrate de que tu mensaje sea fácil de entender y vaya
                      directo al punto.
                    </Text>
                    <Text
                      className={`text-neutros-negro-80 font-poppins-medium text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                    >
                      Incluye detalles interesantes de tu intercambio.
                    </Text>
                    <Text
                      className={`text-neutros-negro-80 font-poppins-medium text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                    >
                      Resalta las ventajas y el valor que obtendrán al
                      participar.
                    </Text>
                  </View>
                )}

                <CustomTextarea
                  value={ability}
                  onChange={setAbility}
                  placeholder={
                    "Ej: Clases de pintura al óleo desde cero. Nivel inicial y avanzado."
                  }
                  multiline={true}
                  numberOfLines={7}
                  maxLength={160}
                  height={146}
                />
              </View>

              {/* ¿Qué categoría...? */}
              <View
                className={`${isSmallScreen ? "mt-1" : "mt-4"} flex-grow mb-[60px]`}
              >
                <Text
                  className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px] mb-[8px]" : isSmallScreen ? "text-[18px] mb-[5px]" : "text-[20px] mb-[8px]"}`}
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
            onPress={togglePopUp}
            variant="white"
            width="content"
            // disabled={!ability || !selectedCategory}
            disabled={!ability}
          />
        </View>
      </View>

      {isPopUpVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isPopUpVisible}
          onRequestClose={togglePopUp}
        >
          <View
            style={{
              backgroundColor: "rgba(144, 145, 146, 0.6)",
            }}
            className="absolute w-full h-screen flex-1 justify-center px-4"
          >
            <View
              className="bg-white p-6 pt-8 rounded-[8px] items-start"
              style={{
                shadowColor: "#212121",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
              }}
            >
              <View
                className={`w-full justify-center items-center gap-[10px] ${isSmallScreen ? "mb-[14px]" : "mb-[24px]"}`}
              >
                <View
                  className={`flex-row items-center ${isSmallScreen ? "" : "mb-2"}`}
                >
                  <CelebrateIcon />
                  <Text className="text-primarios-violeta-100 font-roboto-bold ml-3 text-[24px]">
                    ¡Felicidades!
                  </Text>
                </View>
                <Text className="text-neutros-negro-80 font-roboto-regular text-[16px] text-center w-[80%]">
                  Ya tienes tu primera habilidad cargada en tu cuenta.
                </Text>
              </View>

              <View
                className={`py-[11px] px-[24px] rounded-[8px] bg-[#eef1ff] w-full ${isSmallScreen ? "mb-[14px]" : "mb-[24px]"}`}
              >
                <Text className="text-neutros-negro-80 font-roboto-regular text-[14px]">
                  Puedes <Text className="font-roboto-medium">editarla</Text> o{" "}
                  <Text className="font-roboto-medium">eliminarla</Text> cuando
                  quieras desde la sección de tu perfil.
                </Text>
              </View>

              <View className="mb-[24px] w-full">
                <View
                  className={`bg-neutros-blanco ${isBigScreen ? "py-5" : isSmallScreen ? "py-4" : "py-5"} rounded-[6px] border-x-[1px] border-b-[1px] border-neutral-color-blue-gray-50`}
                >
                  {/* Header */}
                  <View className="flex-row items-center gap-[25px] px-5">
                    <View className="w-[59px] h-[59px] rounded-full">
                      <Image
                        source={require("../../assets/avatar4.png")}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      className={`text-neutros-negro ${isSmallScreen ? "text-[18px]" : "text-[20px]"} font-roboto-medium`}
                    >
                      Juanita Perez
                    </Text>
                  </View>

                  {/* Subheader */}
                  <View
                    className={`${isBigScreen ? "mt-10" : isSmallScreen ? "mt-4" : "mt-8"} px-5`}
                  >
                    <Text
                      className={`font-roboto-regular ${isSmallScreen ? "text-[18px]" : "text-[20px]"} text-neutros-negro`}
                    >
                      Cuidado de animales
                    </Text>
                  </View>

                  {/* Direction */}
                  <View
                    className={`px-4 ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-4"}`}
                  >
                    <Text className="font-roboto-regular text-[14px] text-neutros-negro">
                      14011 Córdoba, Córdoba provincia
                    </Text>
                  </View>

                  {/* Separator */}
                  <View
                    className={`border-b-[0.3px] border-b-neutral-color-blue-gray-50 ${isBigScreen ? "mt-3 mb-4" : isSmallScreen ? "mt-2 mb-2" : "mt-2 mb-3"}`}
                  ></View>

                  {/* Level */}
                  <View className="flex-row gap-2 px-4">
                    <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-neutral-color-blue-gray-50">
                      <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
                        Básico
                      </Text>
                    </View>

                    <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
                      <Text className="font-roboto-regular text-[12px] text-white">
                        Medio
                      </Text>
                    </View>

                    <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-neutral-color-blue-gray-50">
                      <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
                        Avanzado
                      </Text>
                    </View>
                  </View>

                  {/* Availability */}
                  <View
                    className={`flex-row items-center justify-between px-4 ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-5"}`}
                  >
                    <Text className="font-roboto-regular text-[14px] text-neutros-negro">
                      Disponibilidad
                    </Text>
                    <View className="border-[0.3px] border-neutral-color-blue-gray-50 h-[32px] w-fit justify-center px-4 rounded-md">
                      <Text
                        className={`font-roboto-medium ${isSmallScreen ? "text-[12px]" : "text-[14px]"} text-neutros-negro`}
                      >
                        9:00hs a 14:00hs
                      </Text>
                    </View>
                  </View>

                  {/* Descripción */}
                  <Text className="my-2 px-4 text-neutros-negro-80 text-[14px] font-roboto-regular">
                    Aprende a preparar un plato vegano delicioso y nutritivo
                    (desde entrantes hasta postres)
                  </Text>

                  {/* Separator */}
                  <View
                    className={`border-b-[0.3px] border-b-neutral-color-blue-gray-50 ${isBigScreen ? "mt-2 mb-4" : isSmallScreen ? "mt-0 mb-2" : "mt-1 mb-3"}`}
                  ></View>

                  {/* Categories */}
                  <View className="flex-row gap-2 px-4">
                    <View>
                      <CustomChip
                        label={"Animales"}
                        status={"inactive"}
                        showBorder
                      />
                    </View>
                    <View>
                      <CustomChip
                        label={"Consultoría"}
                        status={"inactive"}
                        showBorder
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex-row w-full justify-end">
                <CustomButton
                  onPress={() => {
                    togglePopUp();
                    navigation.navigate("RegisterStep5");
                  }}
                  title={"Continuar"}
                  width="content"
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
