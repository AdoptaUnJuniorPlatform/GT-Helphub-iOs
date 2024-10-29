import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { CustomCheckbox } from "./CustomCheckbox";
import Feather from "@expo/vector-icons/Feather";

export const CustomDropdown = ({
  label,
  items,
  backgroundColor,
  selectedItems,
  onItemsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxPress = (item) => {
    const newSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    onItemsChange(newSelectedItems);
  };

  const getSelectedLabel = () => {
    return selectedItems.length > 0 ? selectedItems.join(", ") : label;
  };

  return (
    <View className="w-full">
      <TouchableOpacity
        onPress={toggleDropdown}
        className={`h-[44px] px-3 py-2 flex-row w-full ${backgroundColor} justify-between items-center border-[1px] rounded-lg`}
        style={{ borderColor: "rgba(105, 104, 104, 0.1)", overflow: "hidden" }}
      >
        <Text
          className="font-roboto-regular text-base text-neutros-negro-80 max-w-[88%] mr-2"
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
          className={`border-[1px] border-gray-200 ${backgroundColor} mt-2 max-h-[200px] rounded-lg`}
        >
          {items.map((item) => (
            <View
              key={item}
              className="px-6 py-2 border-[1px] w-full"
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
