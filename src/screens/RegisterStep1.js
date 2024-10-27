import { useState } from "react";
import { View, SafeAreaView, Dimensions, Text } from "react-native";
import {
  CustomButton,
  StepHeader,
  StepTitle,
  CustomTextarea,
  InputFieldWithIcon,
} from "../components";

const { width } = Dimensions.get("window");

export default function RegisterStep1({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [description, setDescription] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 justify-between px-4">
        <View className="flex-1">
          <StepHeader
            step="1"
            statusStepLabel1={"active"}
            statusStepLabel2={"inactive"}
            label1={"Sobre ti"}
            label2={"Tu foto"}
            status1={"active"}
            status2={"inactive"}
          />
          <StepTitle title="Paso 1" subtitle="Cuéntanos un poco más sobre ti" />
          <View>
            <Text
              className={`
                font-roboto-medium text-neutros-negro 
                ${isBigScreen ? "text-[21px] mt-[25px] mb-[22px]" : isSmallScreen ? "text-lg my-[13px]" : "text-xl my-5"}
                `}
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
              <Text className="text-neutros-negro-80 font-roboto-regular text-xs">
                Introduce tu código postal (5 dígitos) para identificar tu
                ubicación.
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation Button Set */}
        <View
          className={`
            flex-row items-center justify-between 
            ${isSmallScreen ? "mt-auto mb-2" : "mt-12"}
            `}
        >
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
            width="content"
            isBackButton
          />
          <CustomButton
            title="Continuar"
            onPress={() => navigation.navigate("RegisterStep2")}
            variant="white"
            width="content"
            disabled={!description || !postalCode}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
