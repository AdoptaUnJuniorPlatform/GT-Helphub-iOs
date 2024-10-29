import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { CustomButton, CustomTextarea, CustomDropdown } from "../components";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { categories } from "../data/data";

const { width } = Dimensions.get("window");

const AddAbilityStep2 = ({ onRequestClose, visible, navigation }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [isDialogVisible, setDialogVisible] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("HomeTabs");
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      description: "",
      category: "",
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
            onPress={() => navigation.navigate("HomeTabs")}
            className={`
              ${isBigScreen ? "h-[42px]" : isSmallScreen ? "h-[30px]" : "h-[36px]"} 
              flex-row items-center justify-center pl-2 pr-4
              `}
          >
            <View className="mr-2">
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

        {/* Form Section */}
        <View
          className={`
            bg-[#f7f7f7] rounded-lg 
            ${isSmallScreen ? "pt-3 pb-4 px-4 mx-4 my-2" : "px-4 pt-2 m-4"}
            `}
        >
          {/* ¿Qué ofreces? */}
          <View className={`${isSmallScreen ? "mt-2" : "mt-4"}`}>
            <View className="flex-row justify-between items-center mb-2">
              <Text
                className={`
                  text-neutral-color-gray-900 font-roboto-medium 
                  ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-lg" : "text-xl"}
                  `}
              >
                ¿Qué ofreces?
              </Text>
              <TouchableOpacity
                onPress={toggleDialog}
                className="h-[36px] flex-row items-center justify-center rounded-lg"
              >
                <Text className="uppercase font-roboto-bold text-xs text-primarios-celeste-100">
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
              <View
                className="rounded-lg bg-[#EEF1FF] p-4 mb-4"
                style={{
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  shadowColor: "#000000",
                }}
              >
                <Text className="text-neutral-color-blue-gray-900 font-roboto-bold text-base mb-3">
                  Como generar un texto llamativo
                </Text>
                <Text
                  className={`
                    text-neutros-negro-80 font-roboto-regular text-sm 
                    ${isSmallScreen ? "mb-2" : "mb-3"}
                    `}
                >
                  Asegúrate de que tu mensaje sea fácil de entender y vaya
                  directo al punto.
                </Text>
                <Text
                  className={`
                    text-neutros-negro-80 font-roboto-regular text-sm 
                    ${isSmallScreen ? "mb-2" : "mb-3"}
                    `}
                >
                  Incluye detalles interesantes de tu intercambio.
                </Text>
                <Text
                  className={`
                    text-neutros-negro-80 font-roboto-regular text-sm 
                    ${isSmallScreen ? "mb-2" : "mb-3"}
                    `}
                >
                  Resalta las ventajas y el valor que obtendrán al participar.
                </Text>
              </View>
            )}

            <Controller
              control={control}
              name="description"
              rules={{
                required: "La descripción es obligatoria",
                maxLength: {
                  value: 160,
                  message: "Máximo 160 caracteres",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextarea
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Ej: Clases de pintura al óleo desde cero. Nivel inicial y avanzado."
                  multiline={true}
                  numberOfLines={7}
                  maxLength={160}
                  height={146}
                />
              )}
            />
          </View>

          {/* ¿Qué categoría...? */}
          <View
            className={`
            ${isSmallScreen ? "mt-1" : "mt-4"} 
            flex-grow mb-6
            `}
          >
            <Text
              className={`
                text-neutral-color-gray-900 font-roboto-medium 
                ${isBigScreen ? "text-[21px] mb-2" : isSmallScreen ? "text-lg mb-[5px]" : "text-xl mb-2"}
                `}
            >
              ¿Qué categoría se ajusta mejor a tu habilidad?
            </Text>
            <View className="mt-1">
              <Controller
                control={control}
                name="category"
                rules={{ required: "Selecciona una categoría" }}
                render={({ field: { onChange, value } }) => (
                  <CustomDropdown
                    label="Categorías"
                    items={categories}
                    backgroundColor={"bg-neutros-blanco"}
                    selectedItems={value}
                    onItemsChange={(category) => onChange(category)}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Siguiente */}
      <View
        className={`
          flex-row justify-between mx-4 
          ${isSmallScreen ? "mb-2" : "mb-10"} mt-2
          `}
      >
        <CustomButton
          onPress={() => navigation.goBack()}
          title={"Atrás"}
          width="content"
          isBackButton
        />
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          title={"Guardar"}
          width="content"
          variant="white"
          disabled={!isValid}
        />
      </View>
    </View>
  );
};

export default AddAbilityStep2;
