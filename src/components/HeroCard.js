import { View, Text, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomChip } from "./CustomChip";

const { width } = Dimensions.get("window");

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
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <View className="w-[280px] overflow-hidden bg-neutros-blanco mx-4 rounded-[6px] border-x-[1px] border-b-[1px] border-neutral-color-blue-gray-50 py-4">
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
            className={`text-neutros-negro ${isSmallScreen ? "text-[18px]" : "text-[20px]"} font-roboto-medium mr-1`}
          >
            {name}
          </Text>
          <Text
            className={`text-neutros-negro ${isSmallScreen ? "text-[18px]" : "text-[20px]"} font-roboto-medium`}
          >
            {surname}
          </Text>
        </View>
      </View>

      {/* Ability */}
      <View
        className={`${isBigScreen ? "mt-10" : isSmallScreen ? "mt-4" : "mt-8"} mx-6`}
      >
        <Text className="font-roboto-regular text-[16px] text-neutros-negro">
          {ability}
        </Text>
      </View>

      {/* Mode */}
      <View
        className={`${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-4"} mx-5`}
      >
        <Text className="font-roboto-regular text-[14px] text-neutros-negro">
          {mode}
        </Text>
      </View>

      {/* Availability */}
      <View
        className={`flex-row items-center justify-between ${isBigScreen ? "mt-5" : isSmallScreen ? "mt-3" : "mt-5"} mx-4`}
      >
        <Text className="font-roboto-regular text-[14px] text-neutros-negro">
          Disponibilidad
        </Text>
        <View className="h-[32px] w-fit justify-center px-4 rounded-[8px] border-[1px] border-neutral-color-blue-gray-50">
          <Text
            className={`font-roboto-medium ${isSmallScreen ? "text-[12px]" : "text-[14px]"} text-neutros-negro`}
          >
            {timeSlot}
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <ScrollView className="overflow-hidden px-3 my-2 mr-2 max-h-[53px]">
        <Text className="w-full text-wrap my-2 text-neutros-negro-80 text-[14px] font-roboto-regular">
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
