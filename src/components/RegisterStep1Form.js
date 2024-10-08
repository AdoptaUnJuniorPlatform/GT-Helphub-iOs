import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const RegisterStep1Form = ({ navigation }) => {
  const [postalCode, setPostalCode] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View>
      {/* Header */}
      <Text className="font-roboto-regular text-h5 text-neutros-negro my-[20px]">
        Breve descripción del usuario
      </Text>
      {/* Textarea */}
      <View>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Por Ej: Soy una joven estudiante de enfermería, tengo 22 años vivo en Madrid con unas amigas. Soy una apasionada por la música, y que desea aprender a tocar el piano."
          className="border-[1px] border-neutral-color-blue-gray-100 rounded-[8px] font-roboto-regular h-[146px] bg-transparent text-[14px] text-[#90A4AE] p-3"
          placeholderTextColor="neutral-color-blue-gray-300"
          multiline={true}
          numberOfLines={7}
          maxLength={255}
        />
        <Text className="absolute bottom-2 right-3 text-[12px] text-neutral-color-blue-gray-300">
          {description.length}/255
        </Text>
      </View>
      {/* Postal Code Input */}
      <View className="gap-2 my-2">
        <Text className="text-neutral-color-blue-gray-900 font-poppins-medium text-[14px]">
          Ubicación
        </Text>
        <View className="relative border-[1px] border-neutral-color-blue-gray-100 rounded-[8px] h-[40px] bg-transparent flex-row items-center">
          <EvilIcons
            name="envelope"
            size={16}
            color="#90a3ae"
            style={{ marginLeft: 10 }}
          />
          <TextInput
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Código postal (CP)"
            className="flex-1 font-roboto-regular text-[14px] text-neutral-color-blue-gray-300 p-3 pl-2"
            placeholderTextColor="neutral-color-blue-gray-300"
            secureTextEntry={true}
          />
        </View>
      </View>
      <Text className="text-neutral-color-blue-gray-400 font-poppins-medium text-[13px]">
        Por favor escribe tu código postal (5 dígitos) de tu lugar de
        residencia.
      </Text>
    </View>
  );
};

export default RegisterStep1Form;
