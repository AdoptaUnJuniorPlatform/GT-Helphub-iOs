import { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import CustomTextarea from "../CustomTextarea";
import InputFieldWithIcon from "../InputFieldWithIcon";

const { width } = Dimensions.get("window");

const RegisterStep1Form = ({ navigation }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [description, setDescription] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <View>
      <Text
        className={`font-roboto-medium text-neutros-negro ${isBigScreen ? "text-[21px] mt-[25px] mb-[22px]" : isSmallScreen ? "text-[18px] my-[13px]" : "text-[20px] my-[20px]"}`}
      >
        Breve descripción del usuario
      </Text>
      <CustomTextarea
        value={description}
        onChange={setDescription}
        placeholder="Por Ej: Soy una joven estudiante de enfermería, tengo 22 años vivo en Madrid con unas amigas. Soy una apasionada por la música, y que desea aprender a tocar el piano."
        multiline={true}
        numberOfLines={7}
        maxLength={160}
        height={146}
      />
      <View className={`${isBigScreen ? "mt-6" : "mt-4"}`}>
        <InputFieldWithIcon
          label="Ubicación"
          value={postalCode}
          onChangeText={setPostalCode}
          placeholder="Código postal (CP)"
          iconName="envelope"
        />
        <Text className="text-neutral-color-blue-gray-400 font-poppins-medium text-[13px]">
          Introduce tu código postal (5 dígitos) para identificar tu ubicación.
        </Text>
      </View>
    </View>
  );
};

export default RegisterStep1Form;
