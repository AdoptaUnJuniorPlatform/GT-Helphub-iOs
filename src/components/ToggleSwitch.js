import { useRef } from "react";
import { TouchableOpacity, Animated } from "react-native";

export const ToggleSwitch = ({ isEnabled, onToggle }) => {
  const animatedValue = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

  const toggleSwitch = () => {
    onToggle(!isEnabled);

    Animated.timing(animatedValue, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ECEFF1", "#3F51B5"],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 18],
  });

  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      className="w-[40px] h-[20px] rounded-full"
      activeOpacity={0.8}
    >
      <Animated.View
        style={{
          backgroundColor: backgroundColor,
        }}
        className="w-[40px] h-[20px] rounded-full flex-row items-center p-1"
      >
        <Animated.View
          style={{
            transform: [{ translateX: translateX }],
          }}
          className="w-[16px] h-[16px] rounded-full bg-white"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
