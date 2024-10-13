// import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

// const categories = [
//   "Idiomas",
//   "Fitness",
//   "Diseño",
//   "Tutorías",
//   "Ayuda",
//   "Animales",
//   "Bricolaje",
//   "Consultoría",
//   "Informática",
//   "Cuidado personal",
// ];

const CustomSelector = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <View className="h-[59px] pl-3 mt-1 flex-row w-full bg-[#fbfbff] justify-between items-center border border-neutros-negro-50 rounded-[6px]">
      <View className="w-[33%]">
        <Text className="text-neutros-negro-80">Idiomas</Text>
      </View>
      <TouchableOpacity
        onPress={console.log("toggle dropdown")}
        className="h-auto p-3 flex-row flex-grow bg-[#fbfbff] justify-between items-center rounded-[6px]"
      >
        <Text className="font-roboto-regular text-[16px] text-neutros-negro-80 flex-shrink mr-2">
          Categorías
        </Text>
        <AntDesign name={"caretdown"} size={10} color="#696868" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSelector;
