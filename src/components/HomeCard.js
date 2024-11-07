import { View, Text, Image } from "react-native";
import { CustomChip } from "./CustomChip";
import { CustomButton } from "./CustomButton";
import { getScreenSize } from "../utils/screenSize";

export const HomeCard = ({ onPress, data }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  return (
    <View
      className={`${isBigScreen ? "w-[325px] py-5" : isSmallScreen ? "w-[300px] py-4" : "w-[307px] py-5"} mr-4 rounded-[6px] bg-neutros-blanco mb-2 ml-2`}
      style={{
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowColor: "#000000",
      }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-[25px] px-5">
        <View className="w-[59px] h-[59px] rounded-full">
          <Image
            source={require("../../assets/avatar4.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <Text
          className={`
            text-neutros-negro font-roboto-medium
            ${isSmallScreen ? "text-lg" : "text-xl"}
            `}
        >
          Juanita Perez
        </Text>
      </View>

      {/* Subheader */}
      <View
        className={`
          ${isBigScreen ? "mt-10" : isSmallScreen ? "mt-4" : "mt-8"}
          px-5
          `}
      >
        <Text
          className={`
            font-roboto-regular text-neutros-negro
            ${isSmallScreen ? "text-lg" : "text-xl"}
            `}
        >
          {data?.title}
        </Text>
      </View>

      {/* Direction */}
      <View
        className={`
          px-4 
          ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-4"}
          `}
      >
        <Text className="font-roboto-regular text-sm text-neutros-negro">
          14011 Córdoba, Córdoba provincia
        </Text>
      </View>

      {/* Separator */}
      <View
        className={`
          border-b-[0.3px] border-b-neutral-color-blue-gray-50 
          ${isBigScreen ? "mt-3 mb-4" : isSmallScreen ? "mt-2 mb-2" : "mt-2 mb-3"}
          `}
      ></View>

      {/* Level */}
      <View className="flex-row w-content gap-2 px-4">
        {data?.level === "basic" ? (
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

        {data?.level === "medium" ? (
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

        {data?.level === "high" ? (
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

      {/* Availability */}
      <View
        className={`
          flex-row items-center justify-between px-4 
          ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-5"}
          `}
      >
        <Text className="font-roboto-regular text-sm text-neutros-negro">
          Disponibilidad
        </Text>
        <View className="border-[0.3px] border-neutral-color-blue-gray-50 h-[32px] w-fit justify-center px-4 rounded-md">
          <Text
            className={`
              font-roboto-medium text-neutros-negro
              ${isSmallScreen ? "text-xs" : "text-sm"}
              `}
          >
            9:00 a 14:00
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <Text className="my-2 px-4 text-neutros-negro-80 text-sm font-roboto-regular">
        {data?.description}
      </Text>

      {/* Separator */}
      <View
        className={`
          border-b-[0.3px] border-b-neutral-color-blue-gray-50 
          ${isBigScreen ? "mt-2 mb-4" : isSmallScreen ? "mt-0 mb-2" : "mt-1 mb-3"}
          `}
      ></View>

      {/* Categories */}
      <View className="flex-row gap-2 px-4">
        <View>
          <CustomChip label={data?.category} status={"inactive"} showBorder />
        </View>
      </View>

      {/* Separator */}
      <View
        className={`
          border-b-[0.3px] border-b-neutral-color-blue-gray-50 
          ${isBigScreen ? "my-4" : isSmallScreen ? "my-2" : "my-3"}
          `}
      ></View>

      {/* Button Set */}
      <View className="flex-1 flex-row justify-between px-4">
        <View>
          <CustomButton
            onPress={onPress}
            title={"Ver más"}
            variant="white"
            width="content"
          />
        </View>
        <View>
          <CustomButton
            onPress={() => console.log("solicitar intercambio")}
            title={"Solicitar intercambio"}
            variant="filled"
            width="content"
          />
        </View>
      </View>
    </View>
  );
};
