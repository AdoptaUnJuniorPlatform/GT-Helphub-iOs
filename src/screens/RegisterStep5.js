import { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import StepTitle from "../components/StepTitle";
import CustomChip from "../components/CustomChip";
import CustomSelector from "../components/CustomSelector";

export default function RegisterStep5({ navigation }) {
  const [categories, setCategories] = useState([
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

  const toggleCategory = (label) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.label === label
          ? { ...category, active: !category.active }
          : category,
      ),
    );
  };

  const deleteCategory = (label) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.label !== label),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white px-4">
        <StepHeader
          step={"5"}
          label1={"Mis habilidades"}
          label2={"Que quiero aprender"}
          status1={"inactive"}
          status2={"active"}
        />

        <StepTitle
          title={"Paso 5"}
          subtitle={"Último paso\nIntercambiando habilidades"}
        />

        <View className="justify-between flex-grow">
          <View>
            {/* ¿Qué te gustaría...? */}
            <View className="mt-4">
              <Text className="mb-[8px] text-neutral-color-gray-900 font-roboto-medium text-[20px]">
                ¿Qué te gustaría aprender?
              </Text>

              <Text className="text-neutral-color-blue-gray-500 leading-6 font-roboto-regular text-[16px]">
                Nos gustaría saber qué te gustaría aprender, para que los demás
                usuarios puedan ofrecerte su ayuda.
              </Text>
            </View>

            {/* Categorías */}
            <View className=" mt-4">
              <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px]">
                Categorías populares
              </Text>
              <View className="flex flex-wrap flex-row justify-start align-center gap-2 mt-1">
                {categories.map((category) => (
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

              {/* Busca */}
              <View className="mt-4">
                <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px] mb-[8px]">
                  Busca habilidades
                </Text>
                <CustomSelector />
              </View>
            </View>

            {/* Navigation Button Set */}
            <View className="flex-row items-center justify-between mt-12">
              <CustomButton
                title="Atrás"
                onPress={() => navigation.goBack()}
                width="content"
                isBackButton
              />
              <CustomButton
                title="Siguiente"
                onPress={() => navigation.navigate("SessionStart")}
                variant="white"
                width="content"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
