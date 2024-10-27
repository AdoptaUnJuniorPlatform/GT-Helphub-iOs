import { View, Text, Image, Dimensions } from "react-native";
import { CustomChip } from "./CustomChip";
import { CustomButton } from "./CustomButton";

const { width } = Dimensions.get("window");

export const HomeCard = ({ onPress }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

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
          className={`text-neutros-negro ${isSmallScreen ? "text-[18px]" : "text-[20px]"} font-roboto-medium`}
        >
          Juanita Perez
        </Text>
      </View>

      {/* Subheader */}
      <View
        className={`${isBigScreen ? "mt-10" : isSmallScreen ? "mt-4" : "mt-8"} px-5`}
      >
        <Text
          className={`font-roboto-regular ${isSmallScreen ? "text-[18px]" : "text-[20px]"} text-neutros-negro`}
        >
          Cuidado de animales
        </Text>
      </View>

      {/* Direction */}
      <View
        className={`px-4 ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-4"}`}
      >
        <Text className="font-roboto-regular text-[14px] text-neutros-negro">
          14011 Córdoba, Córdoba provincia
        </Text>
      </View>

      {/* Separator */}
      <View
        className={`border-b-[0.3px] border-b-neutral-color-blue-gray-50 ${isBigScreen ? "mt-3 mb-4" : isSmallScreen ? "mt-2 mb-2" : "mt-2 mb-3"}`}
      ></View>

      {/* Level */}
      <View className="flex-row gap-2 px-4">
        <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-neutral-color-blue-gray-50">
          <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
            Básico
          </Text>
        </View>

        <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-primarios-celeste-100">
          <Text className="font-roboto-regular text-[12px] text-white">
            Medio
          </Text>
        </View>

        <View className="flex-row w-content px-[11px] h-[22px] rounded-full items-center bg-neutral-color-blue-gray-50">
          <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
            Avanzado
          </Text>
        </View>
      </View>

      {/* Availability */}
      <View
        className={`flex-row items-center justify-between px-4 ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-5"}`}
      >
        <Text className="font-roboto-regular text-[14px] text-neutros-negro">
          Disponibilidad
        </Text>
        <View className="border-[0.3px] border-neutral-color-blue-gray-50 h-[32px] w-fit justify-center px-4 rounded-md">
          <Text
            className={`font-roboto-medium ${isSmallScreen ? "text-[12px]" : "text-[14px]"} text-neutros-negro`}
          >
            9:00hs a 14:00hs
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <Text className="my-2 px-4 text-neutros-negro-80 text-[14px] font-roboto-regular">
        Aprende a preparar un plato vegano delicioso y nutritivo (desde
        entrantes hasta postres)
      </Text>

      {/* Separator */}
      <View
        className={`border-b-[0.3px] border-b-neutral-color-blue-gray-50 ${isBigScreen ? "mt-2 mb-4" : isSmallScreen ? "mt-0 mb-2" : "mt-1 mb-3"}`}
      ></View>

      {/* Categories */}
      <View className="flex-row gap-2 px-4">
        <View>
          <CustomChip label={"Animales"} status={"inactive"} showBorder />
        </View>
        <View>
          <CustomChip label={"Consultoría"} status={"inactive"} showBorder />
        </View>
      </View>

      {/* Separator */}
      <View
        className={`border-b-[0.3px] border-b-neutral-color-blue-gray-50 ${isBigScreen ? "my-4" : isSmallScreen ? "my-2" : "my-3"}`}
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
