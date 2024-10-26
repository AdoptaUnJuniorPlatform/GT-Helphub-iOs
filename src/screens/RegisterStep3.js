import { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, Dimensions } from "react-native";
import {
  CustomButton,
  StepHeader,
  CustomDropdown,
  CustomRadio,
  StepTitle,
} from "../components";
import { daysOfTheWeek } from "../data/data";

const { width } = Dimensions.get("window");

export default function RegisterStep1({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [timeSlot, setTimeSlot] = useState("");
  const [days, setDays] = useState("");

  const handleTimeSlotChange = (selectedSlot) => {
    setTimeSlot(selectedSlot);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 bg-neutros-gris-fondo px-4"
        >
          <StepHeader
            step={"3"}
            statusStepLabel1={"active"}
            statusStepLabel2={"inactive"}
            label1={"Disponibilidad"}
            label2={"Mis habilidades"}
            status1={"active"}
            status2={"inactive"}
          />

          <StepTitle title={"Paso 3"} subtitle={"Selecciona tus horarios"} />

          <View className="flex-1">
            <View>
              {/* ¿Qué día...? */}
              <View className="mt-4">
                <Text
                  className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px] mb-[8px]" : isSmallScreen ? "text-[18px] mb-[5px]" : "text-[20px] mb-[8px]"}`}
                >
                  ¿Qué día estás disponible?
                </Text>

                <Text className="text-neutros-negro leading-6 font-roboto-regular text-[16px]">
                  En HelpHub, queremos facilitar a los usuarios la coordinación
                  de horarios.
                </Text>
              </View>

              {/* Disponibilidad horaria */}
              <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
                <Text
                  className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[18px]" : "text-[20px]"}`}
                >
                  Disponibilidad horaria
                </Text>
                <View
                  className={`flex flex-wrap flex-row ${isSmallScreen ? "justify-start" : "justify-between"} mt-2`}
                >
                  <View
                    className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                  >
                    <CustomRadio
                      label="8:00hs a 14:00hs"
                      isSelected={timeSlot === "8:00hs a 14:00hs"}
                      onPress={() => handleTimeSlotChange("8:00hs a 14:00hs")}
                    />
                  </View>
                  <View
                    className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                  >
                    <CustomRadio
                      label="15:00hs a 17:00hs"
                      isSelected={timeSlot === "15:00hs a 17:00hs"}
                      onPress={() => handleTimeSlotChange("15:00hs a 17:00hs")}
                    />
                  </View>
                  <View
                    className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                  >
                    <CustomRadio
                      label="17:00hs a 21:00hs"
                      isSelected={timeSlot === "17:00hs a 21:00hs"}
                      onPress={() => handleTimeSlotChange("17:00hs a 21:00hs")}
                    />
                  </View>
                  <View
                    className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                  >
                    <CustomRadio
                      label="8:00hs a 17:00hs"
                      isSelected={timeSlot === "8:00hs a 17:00hs"}
                      onPress={() => handleTimeSlotChange("8:00hs a 17:00hs")}
                    />
                  </View>
                  <View
                    className={`${isSmallScreen ? "w-[28%] mr-2" : "w-[48%]"} mb-2`}
                  >
                    <CustomRadio
                      label="Horario flexible"
                      isSelected={timeSlot === "Horario flexible"}
                      onPress={() => handleTimeSlotChange("Horario flexible")}
                    />
                  </View>
                </View>
              </View>

              {/* Días */}
              <View
                className={`${isSmallScreen ? "mt-1" : "mt-4"} flex-grow mb-[60px]`}
              >
                <Text
                  className={`text-neutros-negro font-roboto-medium ${isBigScreen ? "text-[21px] mb-[8px]" : isSmallScreen ? "text-[18px] mb-[5px]" : "text-[20px] mb-[8px]"}`}
                >
                  Días
                </Text>
                <Text
                  className={`text-neutros-negro-80 ${isSmallScreen ? "mb-2" : "mb-4"} font-roboto-medium text-[14px]`}
                >
                  Puedes seleccionar más de un día.
                </Text>
                <CustomDropdown
                  label="Seleccionar días"
                  items={daysOfTheWeek}
                  backgroundColor={"bg-[#fbfbff]"}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Navigation Button Set */}
        <View
          className={`bg-neutros-gris-fondo absolute ${isSmallScreen ? "pb-2" : ""} bottom-0 left-0 right-0 px-4 pt-2 flex-row items-center justify-between`}
        >
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
            width="content"
            isBackButton
          />
          <CustomButton
            title="Continuar"
            onPress={() => navigation.navigate("RegisterStep4_1")}
            variant="white"
            width="content"
            // disabled={!timeSlot || !days}
            disabled={!timeSlot}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
