import { View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export const CustomRating = ({ rating = 0 }) => {
  const getRatingLabel = (rating) => {
    switch (rating) {
      case 5:
        return "Excelente";
      case 4:
        return "Muy bueno";
      case 3:
        return "Aceptable";
      case 2:
        return "Mejorable";
      case 1:
        return "Insuficiente";
      default:
        return "Sin opinión";
    }
  };

  return (
    <View className="flex-row justify-start items-center gap-2">
      <View className="flex-row items-center justify-start">
        {[...Array(5)].map((_, index) => (
          <Entypo
            key={index}
            name="star"
            size={12}
            color={index < rating ? "#ffd43c" : "#B8B8B8"}
          />
        ))}
      </View>
      <Text className="font-roboto-regular text-sm text-neutros-negro">
        {getRatingLabel(rating)}
      </Text>
    </View>
  );
};
