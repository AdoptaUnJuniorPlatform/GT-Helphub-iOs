import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomChip } from "./CustomChip";
import { getScreenSize } from "../utils/screenSize";

export const HeroCard = ({
  image,
  name,
  surname,
  ability,
  mode,
  timeSlot,
  description,
  category,
}) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  return (
    <View
      className="w-[280px] overflow-hidden bg-neutros-blanco ml-4 rounded-md border-x-[1px] border-b-[1px] border-neutral-color-blue-gray-50 py-4"
      style={{
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowColor: "#000000",
      }}
    >
      {/* Header */}
      <View className="w-full flex-row items-center gap-4 mx-2">
        <View className="w-[40px] h-[40px] rounded-full">
          <Image
            source={image}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View className="w-3/4 flex-row flex-wrap">
          <Text
            className={`
              text-neutros-negro font-roboto-medium mr-1
              ${isSmallScreen ? "text-lg" : "text-xl"} 
              `}
          >
            {name}
          </Text>
          <Text
            className={`text-neutros-negro font-roboto-medium
              ${isSmallScreen ? "text-lg" : "text-xl"}
              `}
          >
            {surname}
          </Text>
        </View>
      </View>

      {/* Ability */}
      <View
        className={`
          ${isBigScreen ? "mt-10" : isSmallScreen ? "mt-4" : "mt-8"} 
          mx-6
          `}
      >
        <Text className="font-roboto-regular text-base text-neutros-negro">
          {ability}
        </Text>
      </View>

      {/* Mode */}
      <View
        className={`
          ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-4"}
          mx-5
          `}
      >
        <Text className="font-roboto-regular text-[14px] text-neutros-negro">
          {mode}
        </Text>
      </View>

      {/* Availability */}
      <View
        className={`
          flex-row items-center justify-between mx-4
          ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-5"}
          `}
      >
        <Text className="font-roboto-regular text-sm text-neutros-negro">
          Disponibilidad
        </Text>
        <View className="h-[32px] w-fit justify-center px-4 rounded-lg border-[1px] border-neutral-color-blue-gray-50">
          <Text
            className={`
              font-roboto-medium text-neutros-negro
              ${isSmallScreen ? "text-xs" : "text-sm"}
              `}
          >
            {timeSlot}
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <ScrollView className="overflow-hidden px-3 my-2 mr-2 max-h-[53px]">
        <Text className="w-full text-wrap my-2 text-neutros-negro-80 text-sm font-roboto-regular">
          {description}
        </Text>
      </ScrollView>

      {/* Separator */}
      <View className="border-b-[1px] border-b-neutral-color-blue-gray-50 mb-4"></View>

      {/* Categories */}
      <View className="flex-row gap-2 mx-2">
        <View>
          <CustomChip label={category} status={"inactive"} showBorder />
        </View>
      </View>
    </View>
  );
};
