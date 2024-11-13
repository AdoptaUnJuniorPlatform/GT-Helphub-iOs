import { useEffect, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { LogoLight, HeroCard } from "../components";
import { getScreenSize } from "../utils/screenSize";
import { profiles } from "../data/data";

export default function LoginScreen({ navigation }) {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const scrollX = useRef(new Animated.Value(0)).current;

  const CARD_WIDTH = 280;

  useEffect(() => {
    const scrollWidth = (profiles.length - 1) * CARD_WIDTH;

    const scrollAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: -scrollWidth,
          duration: 120000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    scrollAnimation.start();

    return () => scrollAnimation.stop();
  }, [scrollX]);

  return (
    <SafeAreaView className="flex-1 bg-primarios-violeta-100">
      <View className="flex-1 bg-primarios-violeta-100">
        <ImageBackground
          source={require("../../assets/login-background.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        >
          <View className="flex-1">
            <View
              className={`
                px-4 
                ${isSmallScreen ? "py-4" : isBigScreen ? "py-14" : "py-10"}
                `}
            >
              <LogoLight />
            </View>
            <View className="flex-1">
              <View
                className={`
                  px-4 
                  ${isBigScreen ? "pb-8" : isSmallScreen ? "pb-4" : "pb-6"}
                  `}
              >
                <Text
                  className={`
                    font-roboto-light text-white
                    ${isSmallScreen ? "text-[30px]" : isBigScreen ? "text-[38px]" : "text-[35px]"}
                    `}
                >
                  Conecta y Comparte
                </Text>
                <Text
                  className={`
                    font-roboto-regular text-black
                    ${isSmallScreen ? "text-[30px]" : isBigScreen ? "text-[38px]" : "text-[35px]"}
                    `}
                >
                  Habilidades
                </Text>
              </View>

              <View className="flex-row justify-end mt-6 mb-4">
                <Animated.View
                  className="flex-row absolute left-0"
                  style={{ transform: [{ translateX: scrollX }] }}
                >
                  {profiles.map(
                    ({
                      id,
                      image,
                      name,
                      surname,
                      ability,
                      mode,
                      timeSlot,
                      description,
                      category,
                    }) => (
                      <HeroCard
                        key={id}
                        image={image}
                        name={name}
                        surname={surname}
                        ability={ability}
                        mode={mode}
                        timeSlot={timeSlot}
                        description={description}
                        category={category}
                      />
                    ),
                  )}
                </Animated.View>
              </View>

              <View
                className={`
                  flex-1 justify-start items-center bg-transparent px-4 
                  ${isBigScreen ? "mt-8" : isSmallScreen ? "mt-4" : "mt-6"}
                  `}
              >
                <View className="w-full absolute bottom-2">
                  <View className={`${isSmallScreen ? "mb-2" : "mb-4"}`}>
                    <TouchableOpacity
                      className="h-[36px] items-center justify-center rounded-lg w-full bg-white"
                      onPress={() => navigation.navigate("RegisterFlow")}
                    >
                      <Text className="font-roboto-bold text-xs uppercase text-primarios-violeta-100">
                        Crear cuenta nueva
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      className="h-[36px] items-center justify-center rounded-lg w-full bg-white"
                      onPress={() => navigation.navigate("SessionStartFlow")}
                    >
                      <Text className="font-roboto-bold text-xs uppercase text-primarios-violeta-100">
                        Iniciar sesión
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
