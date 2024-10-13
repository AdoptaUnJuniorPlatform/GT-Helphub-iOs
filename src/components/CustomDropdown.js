import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomCheckbox from "./CustomCheckbox";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const CustomDropdown = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxPress = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day],
    );
  };

  const getSelectedLabel = () => {
    return selectedDays.length > 0 ? selectedDays.join(", ") : label;
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleDropdown}
        className="h-[59px] p-3 flex-row w-full bg-[#fbfbff] justify-between items-center border-[1px] rounded-[6px]"
        style={{ borderColor: "rgba(105, 104, 104, 0.1)", overflow: "hidden" }}
      >
        <Text
          className="font-roboto-regular text-[16px] text-neutros-negro-80 flex-shrink mr-2"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {getSelectedLabel()}
        </Text>
        <AntDesign
          name={isOpen ? "caretup" : "caretdown"}
          size={10}
          color="#696868"
        />
      </TouchableOpacity>

      {isOpen && (
        <ScrollView className="border-[1px] border-gray-200 mt-2 max-h-[200px]">
          {daysOfWeek.map((day) => (
            <View
              key={day}
              className="px-6 py-2 border-[1px] w-[97%]"
              style={{
                backgroundColor: selectedDays.includes(day)
                  ? "rgba(229, 243, 255, 0.8)"
                  : "transparent",
                borderColor: selectedDays.includes(day)
                  ? "rgba(229, 243, 255, 1)"
                  : "transparent",
              }}
            >
              <CustomCheckbox
                label={day}
                isChecked={selectedDays.includes(day)}
                onPress={() => handleCheckboxPress(day)}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CustomDropdown;
