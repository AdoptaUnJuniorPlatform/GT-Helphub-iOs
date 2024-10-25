import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const daysOfTheWeek = ["L", "M", "X", "J", "V", "S", "D"];

const Calendar = ({ selectedDays = [], onPress }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <View className="flex-row gap-1">
      {daysOfTheWeek.map((day, index) => {
        const isSelected = selectedDays.includes(index);
        return (
          <TouchableOpacity
            key={index}
            className={`${isSmallScreen ? "h-[20px] w-[15px]" : "h-[25px] w-[20px]"} items-center justify-center rounded-full ${isSelected ? "bg-primarios-violeta-100" : "bg-neutros-negro-6"
              }`}
            onPress={() => onPress(index)}
          >
            <Text
              className={`${isSelected ? "text-white" : "text-neutros-negro-80"} ${isSmallScreen ? "text-[12px]" : "text-[14px]"}`}
            >
              {day}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Calendar;
