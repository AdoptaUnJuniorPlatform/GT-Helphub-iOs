import { View, Text, TouchableOpacity } from "react-native";
import { CustomButton } from "./CustomButton";
import { getScreenSize } from "../utils/screenSize";

export const AbilityCard = ({ onDelete, onEdit, ability }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  return (
    <View
      className={`
        bg-neutros-blanco pb-5 mr-4 ml-1 mb-2 rounded-md 
        ${isSmallScreen ? "w-[310px] h-[190px]" : isBigScreen ? "w-[244px] h-[230px]" : "w-[244px] h-[220px]"}
        `}
      style={{
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowColor: "#000000",
      }}
    >
      {/* Header */}
      <View className="mt-2 px-2">
        <Text
          className={`
            ${isSmallScreen ? "text-sm" : "text-base"}
            font-roboto-regular text-neutros-negro
            `}
        >
          {ability?.title}
        </Text>
      </View>

      {/* Separator */}
      <View
        className={`
          border-b-[0.5px] border-b-neutral-color-blue-gray-50
          ${isBigScreen ? "my-3" : "my-2"}
          `}
      ></View>

      <View className="flex-1 justify-between">
        <View>
          {/* Level */}
          <View className="flex-row w-content gap-2 px-4">
            {ability?.level === "basic" ? (
              <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
                <Text
                  className={`
              font-roboto-regular text-white 
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              `}
                >
                  Básico
                </Text>
              </View>
            ) : (
              <View className="flex-row w-content px-[11px] rounded-full items-center bg-neutral-color-blue-gray-50">
                <Text
                  className={`
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              font-roboto-regular text-neutros-negro-80
              `}
                >
                  Básico
                </Text>
              </View>
            )}

            {ability?.level === "medium" ? (
              <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
                <Text
                  className={`
          font-roboto-regular text-white 
          ${isSmallScreen ? "text-[10px]" : "text-xs"}
          `}
                >
                  Medio
                </Text>
              </View>
            ) : (
              <View className="flex-row w-content px-[11px] rounded-full items-center bg-neutral-color-blue-gray-50">
                <Text
                  className={`
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              font-roboto-regular text-neutros-negro-80
              `}
                >
                  Medio
                </Text>
              </View>
            )}

            {ability?.level === "high" ? (
              <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
                <Text
                  className={`
              font-roboto-regular text-white 
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              `}
                >
                  Avanzado
                </Text>
              </View>
            ) : (
              <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-neutral-color-blue-gray-50">
                <Text
                  className={`
              ${isSmallScreen ? "text-[10px]" : "text-xs"}
              text-neutros-negro-80 font-roboto-regular
              `}
                >
                  Avanzado
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <View
            className={`
        px-4 
        ${isSmallScreen ? "mt-1" : "mt-6"}
        `}
          >
            <Text className="text-neutros-negro leading-5 font-roboto-regular text-sm">
              {ability?.description}
            </Text>
          </View>
        </View>

        <View>
          {/* Separator */}
          <View className="my-2 border-b-[0.5px] border-b-neutral-color-blue-gray-50"></View>

          {/* Button Set */}
          <View className="flex-row justify-start px-4">
            <TouchableOpacity
              onPress={onDelete}
              className="mr-2 px-3 flex-row h-[36px] items-center justify-center rounded-lg border-[1px] border-neutros-negro bg-white"
            >
              <Text className="font-roboto-bold text-xs uppercase text-neutros-negro">
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
      </View>
    </View>
  );
};
