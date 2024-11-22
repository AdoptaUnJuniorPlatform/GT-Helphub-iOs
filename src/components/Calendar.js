import { TouchableOpacity, View, Text } from "react-native";
import { getScreenSize } from "../utils/screenSize";
import { daysOfTheWeekShort, dayMapping } from "../data/data";

export const Calendar = ({ selectedDays = [], onPress }) => {
  const { isSmallScreen } = getScreenSize();

  const selectedIndices = selectedDays
    .map((day) => dayMapping[day])
    .filter((index) => index !== undefined);

  return (
    <View className="flex-row gap-1">
      {daysOfTheWeekShort.map((day, index) => {
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
