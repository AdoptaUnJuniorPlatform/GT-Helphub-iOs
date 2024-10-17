import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomCheckbox from "./CustomCheckbox";

const CustomDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxPress = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item],
    );
  };

  const getSelectedLabel = () => {
    return selectedItems.length > 0 ? selectedItems.join(", ") : label;
  };

  return (
    <View className="w-full">
      <TouchableOpacity
        onPress={toggleDropdown}
        className="h-[44px] p-3 flex-row w-full bg-[#fbfbff] justify-between items-center border-[1px] rounded-[8px]"
        style={{ borderColor: "rgba(105, 104, 104, 0.1)", overflow: "hidden" }}
      >
        <Text
          className="font-roboto-regular text-[16px] text-neutros-negro-80 max-w-[88%] mr-2"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {getSelectedLabel()}
        </Text>
        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={18}
          color="#696868"
        />
      </TouchableOpacity>

      {isOpen && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="border-[1px] border-gray-200 mt-2 max-h-[200px] rounded-[8px]"
        >
          {items.map((item) => (
            <View
              key={item}
              className="px-6 py-2 border-[1px] w-[97%]"
              style={{
                backgroundColor: selectedItems.includes(item)
                  ? "rgba(229, 243, 255, 0.8)"
                  : "transparent",
                borderColor: selectedItems.includes(item)
                  ? "rgba(229, 243, 255, 1)"
                  : "transparent",
              }}
            >
              <CustomCheckbox
                label={item}
                isChecked={selectedItems.includes(item)}
                onPress={() => handleCheckboxPress(item)}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CustomDropdown;
