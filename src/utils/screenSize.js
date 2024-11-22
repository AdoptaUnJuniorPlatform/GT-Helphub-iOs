import { Dimensions } from "react-native";

export const getScreenSize = () => {
  const { width } = Dimensions.get("window");
  return {
    isSmallScreen: width <= 392,
    isBigScreen: width >= 430,
  };
};
