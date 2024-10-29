import { useForm, Controller } from "react-hook-form";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { CustomButton } from "./CustomButton";
import { CustomTextarea } from "./CustomTextarea";
import { CustomRadio } from "./CustomRadio";
import { CustomDropdown } from "./CustomDropdown";
import Feather from "@expo/vector-icons/Feather";
import { categories } from "../data/data";

const { width } = Dimensions.get("window");

export const EditAbility = ({ onRequestClose, visible }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const onSubmit = (data) => {
    console.log(data);
    onRequestClose(onRequestClose);
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
      description: "",
      category: "",
    },
    mode: "onChange",
  });

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View
        className={`
          absolute w-full h-screen flex-1 justify-center 
          ${isSmallScreen ? "pt-8" : "pt-16"} bg-neutros-gris-fondo
          `}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Go Back Button */}
          <View className="bg-neutros-gris-fondo w-full py-2 flex-row justify-start items-center">
            <TouchableOpacity
              onPress={onRequestClose}
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
              ${isSmallScreen ? "pt-3 pb-4 px-4 mx-4 my-2" : "p-4 m-4"}
              `}
          >
            {/* Título... */}
            <View className="mt-1">
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  className={`
                    text-neutral-color-gray-900 font-roboto-medium 
                    ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-xl"}`}
                >
                  Título de tu publicación
                </Text>
              </View>
              <View className={`${isSmallScreen ? "mt-0" : "mt-2"}`}>
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
                  ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-xl"}
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

            {/* ¿Qué ofreces? */}
            <View className="mt-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  className={`
                    text-neutral-color-gray-900 font-roboto-medium
                    ${isBigScreen ? "text-[21px]" : isSmallScreen ? "text-base" : "text-lg"}
                    `}
                >
                  ¿Qué ofreces?
                </Text>
              </View>

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
                    height={100}
                  />
                )}
              />
            </View>

            {/* ¿Qué categoría...? */}
            <View
              className={`
              ${isSmallScreen ? "mt-3" : "mt-4"}
              flex-grow
              `}
            >
              <Text
                className={`
                  text-neutral-color-gray-900 font-roboto-medium 
                  ${isBigScreen ? "text-[21px] mb-2" : isSmallScreen ? "text-base mb-[5px]" : "text-lg mb-2"}
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

        {/* Save and Exit */}
        <View
          className={`
          mx-4 mt-2
          ${isSmallScreen ? "mb-2" : "mb-10"} 
          `}
        >
          <View className="flex-row justify-end">
            <CustomButton
              onPress={handleSubmit(onSubmit)}
              title={"Guardar"}
              width="content"
              variant="white"
              disabled={!isValid}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
