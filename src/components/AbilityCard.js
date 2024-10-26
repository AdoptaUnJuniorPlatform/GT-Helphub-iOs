import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { CustomButton } from "./CustomButton";

const { width } = Dimensions.get("window");

export const AbilityCard = ({ onDelete, onEdit }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <View
      className={`bg-[#FBFBFF] pb-5 mr-4 rounded-[6px] ${isSmallScreen ? "w-[310px] h-[190px]" : "w-[244px] h-[220px]"} border-x-[1px] border-b-[1px] border-neutral-color-blue-gray-50`}
    >
      {/* Header */}
      <View className="mt-2 px-2">
        <Text
          className={`font-roboto-regular ${isSmallScreen ? "text-[14px]" : "text-[16px]"} text-neutros-negro`}
        >
          Pintura al óleo
        </Text>
      </View>

      {/* Separator */}
      <View
        className={`border-b-[0.5px] border-b-neutral-color-blue-gray-50 ${isBigScreen ? "my-3" : "my-2"}`}
      ></View>

      {/* Level */}
      <View className="flex-row w-content gap-2 px-4">
        <View className="flex-row w-content px-[11px] rounded-full items-center bg-neutral-color-blue-gray-50">
          <Text
            className={`font-roboto-regular ${isSmallScreen ? "text-[10px]" : "text-[12px]"} text-neutros-negro-80`}
          >
            Básico
          </Text>
        </View>

        <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
          <Text
            className={`font-roboto-regular ${isSmallScreen ? "text-[10px]" : "text-[12px]"} text-white`}
          >
            Medio
          </Text>
        </View>

        <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-neutral-color-blue-gray-50">
          <Text
            className={`font-roboto-regular ${isSmallScreen ? "text-[10px]" : "text-[12px]"} text-neutros-negro-80`}
          >
            Avanzado
          </Text>
        </View>
      </View>

      {/* Description */}
      <View className={`px-4 ${isSmallScreen ? "mt-1" : "mt-6"}`}>
        <Text className="text-neutros-negro leading-5 font-roboto-regular text-[14px]">
          Aprende a preparar un plato vegano delicioso y nutritivo (desde
          entrantes hasta postres)
        </Text>
      </View>

      {/* Separator */}
      <View className="my-2 border-b-[0.5px] border-b-neutral-color-blue-gray-50"></View>

      {/* Button Set */}
      <View className="flex-1 flex-row justify-start px-4">
        <TouchableOpacity
          onPress={onDelete}
          className="mr-2 px-3 flex-row h-[36px] items-center justify-center rounded-[8px] border-[1px] border-neutros-negro bg-white"
        >
          <Text className="font-roboto-bold text-[12px] uppercase text-neutros-negro">
            Borrar
          </Text>
        </TouchableOpacity>
        <View>
          <CustomButton
            onPress={onEdit}
            title={"Editar"}
            variant="filled"
            width="content"
          />
        </View>
      </View>
    </View>
  );
};
