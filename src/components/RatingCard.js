import { useState, useRef } from "react";
import { View, Text, Dimensions, Image, ScrollView } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const { width } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

export const RatingCard = ({ onPress }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollY(offsetY);
  };

  return (
    <View
      className={`
        p-5 mr-4 ml-1 mb-2 rounded-[10px] bg-white
        ${isSmallScreen ? "py-[15px]" : "pt-[25px]"} 
        `}
      style={{
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowColor: "#000000",
      }}
    >
      <View
        className={`
        w-[203px] h-[83px] 
        ${isSmallScreen ? "mb-2" : "mb-4"}
        `}
      >
        {/* Scroll Text */}
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          className="bg-white w-full"
        >
          <Text className="w-[90%] font-roboto-regular text-sm text-neutros-negro">
            Las clases de pintura al óleo han sido maravillosas. ¡Además,
            intercambiar habilidades de cocina vegetariana ha sido todo un
            acierto!"
          </Text>
        </ScrollView>
        <View className="absolute right-0 top-0 h-full w-[9px] bg-primarios-violeta-20 rounded-[7px]">
          <View
            style={{ top: (scrollY / 2000) * (screenHeight - 50) }}
            className="bg-primarios-violeta-100 absolute -right-[2px] w-[13px] h-[26px] rounded-[7px]"
          />
        </View>
      </View>

      <View className="flex-row justify-center">
        <View className="w-[49px] h-[49px] mr-2">
          <Image
            source={require("../../assets/avatar6.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View className="items-start justify-between">
          <Text className="font-roboto-medium text-sm text-neutros-negro">
            Laura García
          </Text>
          <View className="flex-row items-center">
            <View className="flex-row w-content py-1 px-2 rounded-full items-center bg-transparent border-[1px] border-neutros-negro-80">
              <Text className="font-roboto-regular text-xs text-neutros-negro-80">
                Cocina
              </Text>
            </View>
            <View className="mx-1">
              <FontAwesome6 name="arrows-rotate" size={17} color="#696868" />
            </View>
            <View className="flex-row w-content py-1 px-2 rounded-full items-center bg-transparent border-[1px] border-neutros-negro-80">
              <Text className="font-roboto-regular text-xs text-neutros-negro-80">
                Pintura
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
