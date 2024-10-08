import { Text, View, SafeAreaView, ScrollView } from "react-native";
import RegisterStep1Form from "../components/RegisterStep1Form";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import CustomChip from "../components/CustomChip";
import Stepper from "../components/Stepper";

export default function RegisterStep1({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white px-4">
        <View className="mb-5">
          <StepHeader title="Cuéntanos un poco más sobre vos" />

          <View className="px-4">
            <Stepper />

            <View className="mt-[20px] w-full flex-row justify-between items-center">
              <CustomChip label={"Sobre ti"} status="active" />
              <CustomChip label={"Tu foto"} status="inactive" />
            </View>
          </View>
        </View>

        <Text className="text-primarios-violeta-100 text-h font-roboto-regular">
          Paso 1
        </Text>

        <RegisterStep1Form />

        <View className="flex-row items-center justify-between mt-12">
          <CustomButton
            title="Atrás"
            onPress={() => navigation.navigate("Register")}
            width="content"
            isBackButton
          />
          <CustomButton
            title="Siguiente"
            onPress={() => navigation.navigate("RegisterStep2")}
            variant="white"
            width="content"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
