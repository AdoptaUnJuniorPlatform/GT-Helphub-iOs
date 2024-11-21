import { useRef, useEffect } from "react";
import { View, Animated, Text, Easing } from "react-native";
import { WarningIcon } from "./svgComponents/WarningIcon";
import { CustomButton } from "./CustomButton";
import { getScreenSize } from "../utils/screenSize";

export const CreateProfileWarning = ({ isVisible, onClose }) => {
  const { isSmallScreen } = getScreenSize();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={{
        opacity: opacity,
        backgroundColor: "rgba(144, 145, 146, 0.6)",
      }}
      className="absolute w-full h-screen flex-1 justify-center px-4"
    >
      <View
        className="bg-white p-[24px] rounded-[8px]"
        style={{
          shadowColor: "#212121",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
        }}
      >
        <View className="mb-[24px]">
          <View className="flex-row justify-center">
            <WarningIcon />
          </View>

          <Text className="my-2 text-primarios-violeta-100 font-roboto-bold text-2xl text-center">
            Personaliza tu Experiencia
          </Text>
          <Text className="mb-2 text-primarios-violeta-80 font-roboto-medium text-base text-center">
            Cuéntanos de ti y activa tu primera habilidad.
          </Text>
          <View className="mb-2 py-[11px] px-6 rounded-lg bg-neutros-beige-fondo w-full">
            <Text
              className={`
              text-neutros-negro-80 font-roboto-regular text-sm 
              ${isSmallScreen ? "w-[90%]" : ""}
              `}
            >
              Completa los detalles y recibe recomendaciones personalizadas.
            </Text>
          </View>
          <View className="py-[11px] px-6 rounded-lg bg-neutros-beige-fondo w-full">
            <Text
              className={`
              text-neutros-negro-80 font-roboto-regular text-sm 
              ${isSmallScreen ? "w-[90%]" : ""}
              `}
            >
              Añade al menos una habilidad para iniciar tu experiencia de
              intercambio.
            </Text>
          </View>
        </View>
        <View className="items-end">
          <CustomButton
            onPress={onClose}
            title="Completar perfil"
            width="content"
          />
        </View>
      </View>
    </Animated.View>
  );
};
