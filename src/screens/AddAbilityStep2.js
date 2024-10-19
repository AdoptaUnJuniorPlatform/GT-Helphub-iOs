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
import CustomDropdown from "../components/CustomDropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { categories } from "../data/data";

const { width } = Dimensions.get("window");

const AddAbilityStep2 = ({ onRequestClose, visible, navigation }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [isDialogVisible, setDialogVisible] = useState(false);
  const [ability, setAbility] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  return (
    <View
      className={`absolute w-full h-screen flex-1 justify-center ${isSmallScreen ? "pt-8" : "pt-16"} bg-white`}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Go Back Button */}
        <View className="bg-[#fbfbff] w-full py-2 flex-row justify-start items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeTabs")}
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

        {/* Form Section */}
        <View
          className={`bg-[#f7f7f7] rounded-[8px] ${isSmallScreen ? "pt-3 pb-4 px-4 mx-4 my-2" : "px-4 pt-2 m-4"}`}
        >
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
                  className={`text-neutros-negro-80 font-roboto-regular text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Asegúrate de que tu mensaje sea fácil de entender y vaya
                  directo al punto.
                </Text>
                <Text
                  className={`text-neutros-negro-80 font-roboto-regular text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Incluye detalles interesantes de tu intercambio.
                </Text>
                <Text
                  className={`text-neutros-negro-80 font-roboto-regular text-[14px] ${isSmallScreen ? "mb-2" : "mb-3"}`}
                >
                  Resalta las ventajas y el valor que obtendrán al participar.
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
          <View className={`${isSmallScreen ? "mt-1" : "mt-4"} flex-grow mb-6`}>
            <Text
              className={`text-neutral-color-gray-900 font-roboto-medium ${isBigScreen ? "text-[21px] mb-[8px]" : isSmallScreen ? "text-[18px] mb-[5px]" : "text-[20px] mb-[8px]"}`}
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

      {/* Siguiente */}
      <View
        className={`flex-row justify-between mx-4 ${isSmallScreen ? "mb-2" : "mb-10"} mt-2`}
      >
        <CustomButton
          onPress={() => navigation.goBack()}
          title={"Atrás"}
          width="content"
          isBackButton
        />
        <CustomButton
          onPress={() => navigation.navigate("HomeTabs")}
          title={"Siguiente"}
          width="content"
          variant="white"
        />
      </View>
    </View>
  );
};

export default AddAbilityStep2;
