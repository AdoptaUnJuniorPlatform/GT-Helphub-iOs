import { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import CustomDropdown from "../components/CustomDropdown";
import StepTitle from "../components/StepTitle";
import CustomTextarea from "../components/CustomTextarea";
import { categories } from "../data/data";
import Feather from "@expo/vector-icons/Feather";
import CelebrateIcon from "../components/svgComponents/CelebrateIcon";

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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 bg-white px-4"
        >
          <StepHeader
            step={"4"}
            label1={"Mis habilidades"}
            label2={"Que quiero aprender"}
            status1={"active"}
            status2={"inactive"}
          />

          <StepTitle title={"Paso 4"} subtitle={"¡Ya casi terminamos!"} />

          <View className="flex-1">
            <View>
              {/* ¿Qué ofreces? */}
              <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
                <View className="flex-row justify-between items-center mb-2">
                  <Text
                    className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[18px]" : "text-[20px]"}`}
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
                  maxLength={255}
                  height={146}
                />
              </View>

              {/* ¿Qué categoría...? */}
              <View
                className={`${isSmallScreen ? "mt-1" : "mt-4"} flex-grow mb-[60px]`}
              >
                <Text
                  className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px] mb-[8px]" : isSmallScreen ? "text-[18px] mb-[5px]" : "text-[20px] mb-[8px]"}`}
                >
                  ¿Qué categoría se ajusta mejor a tu habilidad?
                </Text>
                <View className="mt-1">
                  <CustomDropdown label="Categorías" items={categories} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Navigation Button Set */}
        <View
          className={`absolute ${isSmallScreen ? "pb-2" : ""} bottom-0 left-0 right-0 px-4 pt-2 bg-white flex-row items-center justify-between`}
        >
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
            width="content"
            isBackButton
          />
          <CustomButton
            title="Siguiente"
            // onPress={() => navigation.navigate("RegisterStep5")}
            onPress={togglePopUp}
            variant="white"
            width="content"
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
              className="bg-white p-[24px] rounded-[8px] items-start"
              style={{
                shadowColor: "#212121",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
              }}
            >
              <View className="w-full justify-center items-center gap-[10px] mb-[24px]">
                <CelebrateIcon />
                <Text className="text-primarios-violeta-100 font-roboto-bold text-[24px]">
                  ¡Felicidades!
                </Text>
                <Text className="text-neutros-negro-80 font-roboto-regular text-[16px] text-center w-[80%]">
                  Ya tienes tu primera habilidad cargada en tu cuenta.
                </Text>
              </View>

              <View className="py-[11px] px-[24px] rounded-[8px] bg-[#eef1ff] w-full mb-[24px]">
                <Text className="text-neutros-negro-80 font-roboto-regular text-[14px]">
                  Puedes <Text className="font-roboto-medium">editarla</Text> o{" "}
                  <Text className="font-roboto-medium">eliminarla</Text> cuando
                  quieras desde la sección de tu perfil.
                </Text>
              </View>

              <View className="mb-[24px] w-full">
                <Text
                  className="font-roboto-regular text-[16px] mb-[10px]"
                  style={{ color: "rgba(113, 102, 210, 0.8)" }}
                >
                  Vista previa
                </Text>

                <View
                  className="bg-[#fbfbff] w-full rounded-[8px] p-[24px]"
                  style={{
                    shadowColor: "#212121",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                  }}
                >
                  <View>
                    <Text className="font-roboto-regular text-[24px] text-neutros-negro mb-3">
                      Clases de cocina
                    </Text>
                    <Text className="font-roboto-regular text-[14px] text-neutros-negro">
                      Online
                    </Text>
                  </View>

                  <View
                    className={`border-b-[0.3px] border-b-neutral-color-blue-gray-50 ${isBigScreen ? "mt-2 mb-4" : isSmallScreen ? "mt-1 mb-2" : "mt-1 mb-3"}`}
                  ></View>

                  <View>
                    <Text className="font-roboto-regular text-[13px] text-neutros-negro">
                      Nivel
                    </Text>
                    <View className="flex-row gap-2 mt-0">
                      <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center">
                        <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
                          Básico
                        </Text>
                      </View>

                      <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
                        <Text className="font-roboto-regular text-[12px] text-white">
                          Medio
                        </Text>
                      </View>

                      <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center">
                        <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
                          Experto
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    className={`border-b-[0.3px] border-b-neutral-color-blue-gray-50 ${isBigScreen ? "mt-3 mb-4" : isSmallScreen ? "mt-2 mb-3" : "my-3"}`}
                  ></View>

                  <View className="flex-row">
                    <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center border-[1px] border-neutros-negro-80">
                      <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
                        Tutorías
                      </Text>
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
