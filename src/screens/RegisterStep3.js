import { useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import CustomDropdown from "../components/CustomDropdown";
import CustomRadio from "../components/CustomRadio";
import StepTitle from "../components/StepTitle";

export default function RegisterStep1({ navigation }) {
  const [timeSlot, setTimeSlot] = useState("");

  const handleTimeSlotChange = (selectedSlot) => {
    setTimeSlot(selectedSlot);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white px-4">
        <StepHeader
          step={"3"}
          label1={"Disponibilidad"}
          label2={"Mis habilidades"}
          status1={"active"}
          status2={"inactive"}
        />

        <StepTitle title={"Paso 3"} subtitle={"Selecciona tus horarios"} />

        <View className="justify-between flex-grow">
          <View>
            {/* ¿Qué día...? */}
            <View className="mt-4">
              <Text className="mb-[8px] text-neutral-color-gray-900 font-roboto-medium text-[20px]">
                ¿Qué día estas disponible?
              </Text>

              <Text className="text-neutral-color-blue-gray-500 leading-6 font-roboto-regular text-[16px]">
                En HelpHub, queremos facilitar a los usuarios la coordinación de
                horarios.
              </Text>
            </View>

            {/* Nivel */}
            <View className=" mt-4">
              <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px]">
                Nivel
              </Text>
              <View className="flex flex-wrap flex-row justify-between mt-2">
                <View className="w-[48%] mb-2">
                  <CustomRadio
                    label="8:00hs a 14:00hs"
                    isSelected={timeSlot === "8:00hs a 14:00hs"}
                    onPress={() => handleTimeSlotChange("8:00hs a 14:00hs")}
                  />
                </View>
                <View className="w-[48%] mb-2">
                  <CustomRadio
                    label="15:00hs a 17:00hs"
                    isSelected={timeSlot === "15:00hs a 17:00hs"}
                    onPress={() => handleTimeSlotChange("15:00hs a 17:00hs")}
                  />
                </View>
                <View className="w-[48%] mb-2">
                  <CustomRadio
                    label="17:00hs a 21:00hs"
                    isSelected={timeSlot === "17:00hs a 21:00hs"}
                    onPress={() => handleTimeSlotChange("17:00hs a 21:00hs")}
                  />
                </View>
                <View className="w-[48%] mb-2">
                  <CustomRadio
                    label="8:00hs a 17:00hs"
                    isSelected={timeSlot === "8:00hs a 17:00hs"}
                    onPress={() => handleTimeSlotChange("8:00hs a 17:00hs")}
                  />
                </View>
                <View className="w-[48%] mb-2">
                  <CustomRadio
                    label="Flexibilidad horaria"
                    isSelected={timeSlot === "Flexibilidad horaria"}
                    onPress={() => handleTimeSlotChange("Flexibilidad horaria")}
                  />
                </View>
              </View>
            </View>

            {/* Días */}
            <View className="mt-4">
              <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px] mb-[8px]">
                Días
              </Text>
              <Text className="text-neutral-color-blue-gray-500 mb-4 font-roboto-regular text-[16px]">
                Puedes seccionar más de un día.
              </Text>
              <CustomDropdown label="Seleccionar días" />
            </View>
          </View>

          {/* Navigation Button Set */}
          <View className="flex-row items-center justify-between">
            <CustomButton
              title="Atrás"
              onPress={() => navigation.goBack()}
              width="content"
              isBackButton
            />
            <CustomButton
              title="Siguiente"
              onPress={() => navigation.navigate("RegisterStep4_1")}
              variant="white"
              width="content"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
