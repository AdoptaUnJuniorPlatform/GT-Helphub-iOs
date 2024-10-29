import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { CustomButton, CustomTextarea, CustomRadio } from "../components";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const AddAbilityStep1 = ({ onRequestClose, visible, navigation }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [isDialogVisible, setDialogVisible] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("AddAbilityStep2");
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      title: "",
      level: "",
      mode: "",
    },
    mode: "onChange",
  });

  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  };

  return (
    <View
      className={`
        absolute w-full h-screen flex-1 justify-center bg-neutros-gris-fondo
        ${isSmallScreen ? "pt-8" : "pt-16"}
        `}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Go Back Button */}
        <View className="w-full py-2 flex-row justify-start items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className={`
              ${isBigScreen ? "h-[42px]" : isSmallScreen ? "h-[30px]" : "h-[36px]"}
              flex-row items-center justify-center pl-2 pr-4
              `}
          >
            <View className="mr-4">
              <Feather
                name="chevron-left"
                size={isSmallScreen ? 24 : 28}
                color="#696868"
              />
            </View>
            <Text
              className={`
                font-roboto-medium text-neutros-negro
                ${isSmallScreen ? "text-xl" : "text-[22px]"}
                `}
            >
              Habilidades
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View className="bg-terciario-verde-fondo rounded-lg mx-4 mt-4 px-5 pt-[15px] pb-2.5">
          <View className="flex-row items-center gap-4 mb-2">
            <AntDesign name="checkcircleo" size={24} color="#43A047" />
            <Text className="text-sm text-terciario-verde-oscuro font-roboto-medium">
              ¡Ya tienes 2 habilidades!
            </Text>
          </View>
          <Text className="text-xs text-terciario-verde-oscuro font-roboto-400">
            Sigue sumando habilidades para hacer crecer esta comunidad.
          </Text>
        </View>

        {/* Form Section */}
        <View
          className={`
            bg-[#f7f7f7] rounded-lg 
            ${isSmallScreen ? "pt-3 pb-4 px-4 mx-4 my-2" : "p-4 m-4"}
            `}
        >
          {/* Info */}
          <View>
            <Text
              className={`
                text-neutral-color-gray-900 font-roboto-medium 
                ${isBigScreen ? "text-[21px] mb-2" : isSmallScreen ? "text-lg mb-1" : "text-xl mb-[5px]"}
                `}
            >
              Nueva habilidad
            </Text>
            <Text
              className={`
                text-neutral-color-blue-gray-500 font-roboto-regular text-base
                ${isSmallScreen ? "" : "leading-6"}
                `}
            >
              Puedes agregar varias habilidades y editarlas más tarde.
            </Text>
          </View>

          {/* Título... */}
          <View className="mt-4">
            <View
              className={`
                flex-row justify-between items-center 
                ${isBigScreen ? "mb-2" : isSmallScreen ? "" : "mb-1"}
                `}
            >
              <Text
                className={`
                  text-neutral-color-gray-900 font-roboto-medium 
                  ${isBigScreen ? "text-[21px] w-[35%] text-wrap" : isSmallScreen ? "text-[18px]" : "text-xl w-[35%] text-wrap"}
                  `}
              >
                Título de tu publicación
              </Text>
              <TouchableOpacity
                onPress={toggleDialog}
                className={`
                  ${isBigScreen ? "h-[36px]" : ""}
                  flex-row items-center justify-center rounded-lg
                  `}
              >
                <Text className="uppercase font-roboto-bold text-xs text-primarios-celeste-100">
                  Ejemplos
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
              <View
                className="rounded-lg bg-[#EEF1FF] p-4 my-2"
                style={{
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  shadowColor: "#000000",
                }}
              >
                <Text className="text-neutral-color-blue-gray-900 font-roboto-bold text-base mb-3">
                  Ejemplos para crear tu título
                </Text>
                <Text
                  className={`
                    text-neutros-negro-80 font-roboto-regular text-sm 
                    ${isSmallScreen ? "mb-2" : "mb-3"}
                    `}
                >
                  Sesión grupal de meditación al aire libre.
                </Text>
                <Text
                  className={`
                    text-neutros-negro-80 font-roboto-regular text-sm 
                    ${isSmallScreen ? "mb-2" : "mb-3"}
                    `}
                >
                  Revisión de currículum vitae.
                </Text>
                <Text
                  className={`
                    text-neutros-negro-80 font-roboto-regular text-sm 
                    ${isSmallScreen ? "mb-2" : "mb-3"}
                    `}
                >
                  Clases de cocina italiana tradicional.
                </Text>
                <Text
                  className={`
                    text-neutros-negro-80 font-roboto-regular text-sm 
                    ${isSmallScreen ? "mb-2" : "mb-3"}
                    `}
                >
                  Entrenamiento personal en gimnasio.
                </Text>
              </View>
            )}

            <View className="mt-2">
              <Controller
                control={control}
                name="title"
                rules={{
                  required: "El título es obligatorio",
                  maxLength: {
                    value: 20,
                    message: "Máximo 20 caracteres",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextarea
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={"Ej: Pintar óleo"}
                    multiline={true}
                    numberOfLines={1}
                    maxLength={20}
                  />
                )}
              />
            </View>
          </View>

          {/* Nivel */}
          <View className="mt-4">
            <Text
              className={`
                text-neutral-color-gray-900 font-roboto-medium 
                ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-xl"}
                `}
            >
              Nivel
            </Text>

            <Controller
              control={control}
              name="level"
              rules={{ required: "Selecciona un nivel" }}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`
                  flex flex-wrap flex-row justify-start 
                  ${isSmallScreen ? "mt-1" : "mt-2"}
                  `}
                >
                  <View className="mr-2 w-auto mb-2">
                    <CustomRadio
                      label="Básico"
                      isSelected={value === "Básico"}
                      onPress={() => {
                        onChange("Básico");
                      }}
                    />
                  </View>
                  <View className="mr-2 w-auto mb-2">
                    <CustomRadio
                      label="Medio"
                      isSelected={value === "Medio"}
                      onPress={() => {
                        onChange("Medio");
                      }}
                    />
                  </View>
                  <View className="mr-2 w-auto mb-2">
                    <CustomRadio
                      label="Avanzado"
                      isSelected={value === "Avanzado"}
                      onPress={() => {
                        onChange("Avanzado");
                      }}
                    />
                  </View>
                </View>
              )}
            />
          </View>

          {/* Modalidad */}
          <View className="mt-2">
            <Text
              className={`
                text-neutral-color-gray-900 font-roboto-medium 
                ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-[16px]" : "text-xl"}
                `}
            >
              Modalidad
            </Text>

            <Controller
              control={control}
              name="mode"
              rules={{ required: "Selecciona una modalidad" }}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`
                  flex flex-wrap flex-row justify-start 
                  ${isSmallScreen ? "mt-1" : "mt-2"}
                  `}
                >
                  <View
                    className={`
                    mr-2 w-auto 
                    ${isSmallScreen ? "mb-1" : "mb-2"}
                    `}
                  >
                    <CustomRadio
                      label="Online"
                      isSelected={value === "Online"}
                      onPress={() => {
                        onChange("Online");
                      }}
                    />
                  </View>
                  <View
                    className={`
                    mr-2 w-auto 
                    ${isSmallScreen ? "mb-1" : "mb-2"}
                    `}
                  >
                    <CustomRadio
                      label="Presencial"
                      isSelected={value === "Presencial"}
                      onPress={() => {
                        onChange("Presencial");
                      }}
                    />
                  </View>
                </View>
              )}
            />
          </View>

          {/* Asterisc */}
          <View className="mt-2">
            <Text
              className={`
                text-neutral-color-blue-gray-500 font-roboto-italic leading-5
                ${isSmallScreen ? "text-[11px]" : "text-[13px]"}
                `}
            >
              Recomendamos una reunión online antes de un encuentro presencial
              por seguridad.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Siguiente */}
      <View
        className={`
        mx-4 mt-2
        ${isSmallScreen ? "mb-2" : "mb-10"} 
        `}
      >
        <View className="flex-row justify-end">
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            title={"Siguiente"}
            width="content"
            variant="white"
            disabled={!isValid}
          />
        </View>
      </View>
    </View>
  );
};

export default AddAbilityStep1;
