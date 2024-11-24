import { useForm, Controller } from "react-hook-form";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import {
  CustomButton,
  StepHeader,
  CustomDropdown,
  CustomRadio,
  StepTitle,
} from "../components";
import { useProfile } from "../profile/ProfileContext";
import { daysOfTheWeek } from "../data/data";
import { getScreenSize } from "../utils/screenSize";

export default function RegisterStep1({ navigation }) {
  const { isSmallScreen, isBigScreen } = getScreenSize();
  const { setProfileData } = useProfile();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      selectedDays: [],
      preferredTimeRange: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setProfileData((prevData) => ({
      ...prevData,
      selectedDays: data.selectedDays,
      preferredTimeRange: data.preferredTimeRange,
    }));

    navigation.navigate("RegisterStep4_1");
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
              <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
                <Text
                  className={`
                    text-neutros-negro font-roboto-medium 
                    ${isBigScreen ? "text-[21px] mb-2" : isSmallScreen ? "text-base mb-[5px]" : "text-xl mb-2"}
                    `}
                >
                  ¿Qué día estás disponible?
                </Text>

                <Text className="text-neutros-negro leading-6 font-roboto-regular text-base">
                  En HelpHub, queremos facilitar a los usuarios la coordinación
                  de horarios.
                </Text>
              </View>

              {/* Disponibilidad horaria */}
              <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
                <Text
                  className={`
                    text-neutros-negro font-roboto-medium 
                    ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-xl"}
                    `}
                >
                  Disponibilidad horaria
                </Text>
                <Controller
                  control={control}
                  name="preferredTimeRange"
                  rules={{
                    required: {
                      value: true,
                      message: "Selecciona un horario",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View
                      className={`
        flex flex-wrap flex-row mt-2
        ${isSmallScreen ? "justify-start" : "justify-between"}
      `}
                    >
                      <View
                        className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                      >
                        <CustomRadio
                          label="08:00 a 14:00"
                          isSelected={value === "08:00 a 14:00"}
                          onPress={() => onChange("08:00 a 14:00")}
                        />
                      </View>

                      <View
                        className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                      >
                        <CustomRadio
                          label="15:00 a 17:00"
                          isSelected={value === "15:00 a 17:00"}
                          onPress={() => onChange("15:00 a 17:00")}
                        />
                      </View>

                      <View
                        className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                      >
                        <CustomRadio
                          label="17:00 a 21:00"
                          isSelected={value === "17:00 a 21:00"}
                          onPress={() => onChange("17:00 a 21:00")}
                        />
                      </View>

                      <View
                        className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                      >
                        <CustomRadio
                          label="08:00 a 17:00"
                          isSelected={value === "08:00 a 17:00"}
                          onPress={() => onChange("08:00 a 17:00")}
                        />
                      </View>

                      <View
                        className={`${isSmallScreen ? "w-[45%] mr-2" : "w-[48%]"} mb-2`}
                      >
                        <CustomRadio
                          label="Horario flexible"
                          isSelected={value === "Horario flexible"}
                          onPress={() => onChange("Horario flexible")}
                        />
                      </View>
                    </View>
                  )}
                />
              </View>

              {/* Días */}
              <View
                className={`
                  ${isSmallScreen ? "mt-1" : "mt-4"} 
                  flex-grow mb-[60px]
                  `}
              >
                <Text
                  className={`
                    text-neutros-negro font-roboto-medium 
                    ${isBigScreen ? "text-[21px] mb-2" : isSmallScreen ? "text-base mb-[5px]" : "text-xl mb-2"}
                    `}
                >
                  Días
                </Text>
                <Text
                  className={`
                    text-neutros-negro-80 font-roboto-medium text-sm 
                    ${isSmallScreen ? "mb-2" : "mb-4"} 
                    `}
                >
                  Puedes seleccionar más de un día.
                </Text>
                <Controller
                  control={control}
                  name="selectedDays"
                  rules={{ required: "Selecciona al menos un día" }}
                  render={({ field: { onChange, value } }) => (
                    <CustomDropdown
                      label="Seleccionar días"
                      items={daysOfTheWeek}
                      backgroundColor={"bg-neutros-blanco"}
                      selectedItems={value}
                      onItemsChange={(selectedDays) => onChange(selectedDays)}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          className={`
            bg-neutros-gris-fondo absolute bottom-0 left-0 right-0 px-4 pt-2 flex-row items-center justify-between 
            ${isSmallScreen ? "pb-2" : ""} 
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
