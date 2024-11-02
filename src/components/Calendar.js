import { TouchableOpacity, View, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const daysOfTheWeek = ["L", "M", "X", "J", "V", "S", "D"];

const dayMapping = {
  Lunes: 0,
  Martes: 1,
  Miércoles: 2,
  Jueves: 3,
  Viernes: 4,
  Sábado: 5,
  Domingo: 6,
};

export const Calendar = ({ selectedDays = [], onPress }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const selectedIndices = selectedDays
    .map((day) => dayMapping[day])
    .filter((index) => index !== undefined);

  return (
    <View className="flex-row gap-1">
      {daysOfTheWeek.map((day, index) => {
        const isSelected = selectedIndices.includes(index);
        return (
          <TouchableOpacity
            key={index}
            className={`
              ${isSmallScreen ? "h-[20px] w-[15px]" : "h-[25px] w-[20px]"} 
              ${isSelected ? "bg-primarios-violeta-100" : "bg-neutros-negro-6"} 
              items-center justify-center rounded-full
              `}
            onPress={() => onPress(index)}
          >
            <Text
              className={`
                ${isSelected ? "text-white" : "text-neutros-negro-80"}
                ${isSmallScreen ? "text-xs" : "text-sm"}
                `}
            >
              {day}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
