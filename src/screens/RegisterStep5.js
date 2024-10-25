import { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import StepTitle from "../components/StepTitle";
import CustomChip from "../components/CustomChip";

const { width } = Dimensions.get("window");

export default function RegisterStep5({ navigation }) {
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

  const [selectedCategories, setSelectedcategories] = useState([]);

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
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1">
        <ScrollView className="flex-1 bg-neutros-gris-fondo px-4 pb-20">
          <StepHeader
            step={"5"}
            statusStepLabel1={"inactive"}
            statusStepLabel2={"active"}
            label1={"Mis habilidades"}
            label2={"Que quiero aprender"}
            status1={"inactive"}
            status2={"active"}
          />
          <StepTitle
            title={"Último paso"}
            subtitle={"Intercambiando habilidades"}
          />
          <View className="flex-1">
            <View className="flex-1">
              {/* ¿Qué te gustaría...? */}
              <View className="mt-4">
                <Text
                  className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px] mb-[8px]" : isSmallScreen ? "text-[18px] mb-[5px]" : "text-[20px] mb-[8px]"}`}
                >
                  ¿Qué te gustaría aprender?
                </Text>

                <Text className="text-neutros-negro-80 leading-6 font-roboto-regular text-[16px]">
                  Cuéntanos qué te gustaría aprender para que otros usuarios
                  puedan ayudarte.
                </Text>
              </View>

              {/* Seleccionar */}
              <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
                <Text
                  className={`text-neutros-negro font-roboto-medium ${isBigScreen
                      ? "text-[21px]"
                      : isSmallScreen
                        ? "text-[18px]"
                        : "text-[20px]"
                    }`}
                >
                  Seleccionar categorías
                </Text>
                <Text className="mt-2 text-neutros-negro-80 font-roboto-medium text-[14px]">
                  Puedes seleccionar hasta 3 categorías
                </Text>
                <View
                  className={`flex flex-wrap flex-row justify-start align-center ${isSmallScreen ? "gap-1" : "gap-2"} mt-1`}
                >
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
            title="Siguiente"
            onPress={() => navigation.navigate("HomeTabs")}
            variant="white"
            width="content"
          // disabled={!selectedCategories}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
