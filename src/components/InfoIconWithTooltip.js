import { useState, useRef } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InfoIconWithTooltip = ({ title, text }) => {
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const toggleTooltip = () => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setVisible(false));
    } else {
      setVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View className="relative">
      <Pressable onPress={toggleTooltip}>
        <Ionicons name="information-circle" size={19} color="#90a3ae" />
      </Pressable>

      {visible && (
        <Animated.View
          style={{
            opacity: opacity,
          }}
          className="absolute bottom-8 -left-[115px] w-[252px] p-3 bg-neutros-negro-80 rounded-[8px]"
        >
          <Text className="mb-[6px] text-white font-poppins-medium text-[14px]">
            {title}
          </Text>
          <Text className="text-[14px] font-poppins-regular text-white">
            {text}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default InfoIconWithTooltip;