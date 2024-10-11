import { useState } from "react";
import { View, Text } from "react-native";
import CustomTextarea from "../CustomTextarea";
import InputFieldWithIcon from "../InputFieldWithIcon";

const RegisterStep1Form = ({ navigation }) => {
  const [postalCode, setPostalCode] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View>
      <Text className="font-roboto-regular text-h5 text-neutros-negro my-[20px]">
        Breve descripción del usuario
      </Text>
      <CustomTextarea
        value={description}
        onChange={setDescription}
        placeholder="Por Ej: Soy una joven estudiante de enfermería, tengo 22 años vivo en Madrid con unas amigas. Soy una apasionada por la música, y que desea aprender a tocar el piano."
        numberOfLines="7"
      />
      <View className="flex-1 mt-4">
        <InputFieldWithIcon
          label="Ubicación"
          value={postalCode}
          onChangeText={setPostalCode}
          placeholder="Código postal (CP)"
          iconName="envelope"
        />
        <Text className="text-neutral-color-blue-gray-400 font-poppins-medium text-[13px]">
          Por favor escribe tu código postal (5 dígitos) de tu lugar de
          residencia.
        </Text>
      </View>
    </View>
  );
};

export default RegisterStep1Form;
