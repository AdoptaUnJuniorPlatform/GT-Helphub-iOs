import { useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import CustomChip from "../components/CustomChip";
import Stepper from "../components/Stepper";
import CustomDropdown from "../components/CustomDropdown";
import CustomRadio from "../components/CustomRadio";

export default function RegisterStep1({ navigation }) {
  const [timeSlot, setTimeSlot] = useState("");

  const handleTimeSlotChange = (selectedSlot) => {
    setTimeSlot(selectedSlot);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white px-4">
        <View className="flex-1 mb-5">
          <StepHeader />

          <View className="px-4">
            <Stepper step="3" />

            <View className="mt-[20px] w-full flex-row justify-between items-center">
              <CustomChip label={"Disponibilidad"} status="active" />
              <CustomChip label={"Mis habilidades"} status="inactive" />
            </View>
          </View>
        </View>

        <Text className="text-primarios-violeta-100 text-h font-roboto-regular mb-[20px]">
          Paso 3
        </Text>

        <View className="flex-1">
          <View className="flex-1">
            <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px] mb-[8px]">
              ¿Qué día estas disponible?
            </Text>
            <Text className="text-neutral-color-blue-gray-500 font-poppins-medium text-[16px]">
              En HelpHub, queremos facilitar a los usuarios la coordinación de
              horarios.
            </Text>
          </View>

          <View className="flex-1">
            <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px] my-[8px]">
              Horarios
            </Text>
            <View className="flex flex-wrap flex-row justify-between mt-2 mb-4">
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

          <View className="flex-1 flex-grow">
            <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px] mb-[8px]">
              Días
            </Text>
            <Text className="text-neutral-color-blue-gray-500 mb-5 font-poppins-medium text-[16px]">
              Puedes seccionar más de un día.
            </Text>
            <CustomDropdown label="Seleccionar días" />
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-12">
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
            width="content"
            isBackButton
          />
          <CustomButton
            title="Siguiente"
            onPress={() => navigation.navigate("RegisterStep4")}
            variant="white"
            width="content"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
