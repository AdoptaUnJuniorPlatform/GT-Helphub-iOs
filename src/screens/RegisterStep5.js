import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { CustomButton, StepHeader, StepTitle, CustomChip } from "../components";
import { useProfile } from "../profile/ProfileContext";
import { getScreenSize } from "../utils/screenSize";
import apiClient from "../api/apiClient";

export default function RegisterStep5({ navigation }) {
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

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      interestedSkills: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setProfileData((prevData) => ({
      ...prevData,
      interestedSkills: data.interestedSkills,
    }));

    const formData = {
      ...profileData,
      interestedSkills: data.interestedSkills,
    };

    const {
      description,
      interestedSkills,
      location,
      preferredTimeRange,
      selectedDays,
    } = formData;

    const requestData = {
      description,
      interestedSkills,
      location,
      preferredTimeRange,
      profilePicture: null,
      selectedDays,
    };

    try {
      const response = await apiClient.post("/profile", requestData);
      setProfileData(response.data);
      navigation.navigate("HomeTabs");
    } catch (error) {
      console.error(error.message);
      alert("Se ha producido un error, intenta de nuevo.");
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
                  className={`
                    text-neutros-negro font-roboto-medium 
                    ${isBigScreen ? "text-[21px] mb-2" : isSmallScreen ? "text-lg mb-[5px]" : "text-xl mb-2"}
                    `}
                >
                  ¿Qué te gustaría aprender?
                </Text>

                <Text className="text-neutros-negro-80 leading-6 font-roboto-regular text-base">
                  Cuéntanos qué te gustaría aprender para que otros usuarios
                  puedan ayudarte.
                </Text>
              </View>

              {/* Seleccionar */}
              <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
                <Text
                  className={`
                    text-neutros-negro font-roboto-medium 
                    ${isBigScreen
                      ? "text-[21px]"
                      : isSmallScreen
                        ? "text-lg"
                        : "text-xl"
                    }
                    `}
                >
                  Seleccionar categorías
                </Text>
                <Text className="my-2 text-neutros-negro-80 font-roboto-medium text-sm">
                  Puedes seleccionar hasta 3 categorías
                </Text>
                <Controller
                  control={control}
                  name="interestedSkills"
                  rules={{
                    validate: (value) =>
                      value.length > 0 ||
                      "Debes seleccionar al menos una categoría.",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View
                      className={`${isSmallScreen ? "gap-1" : "gap-2"} flex flex-wrap flex-row justify-start align-center mt-1`}
                    >
                      {allCategories.map((category) => (
                        <TouchableOpacity
                          key={category.label}
                          onPress={() =>
                            toggleCategory(category.label, onChange)
                          }
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
          </View>
        </ScrollView>

        {/* Navigation Button Set */}
        <View
          className={`
            ${isSmallScreen ? "pb-2" : ""} 
            absolute bottom-0 left-0 right-0 px-4 pt-2 bg-neutros-gris-fondo flex-row items-center justify-between
            `}
        >
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
            width="content"
            isBackButton
          />
          <CustomButton
            title="Continuar"
            onPress={handleSubmit(onSubmit)}
            variant="white"
            width="content"
            disabled={!isValid}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
