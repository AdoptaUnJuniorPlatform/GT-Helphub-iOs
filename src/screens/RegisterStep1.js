import { Text, View, SafeAreaView } from "react-native";
import RegisterStep1Form from "../components/forms/RegisterStep1Form";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import CustomChip from "../components/CustomChip";
import Stepper from "../components/Stepper";

export default function RegisterStep1({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-4">
        <View className="flex-1">
          {/* Step Header with Stepper */}
          <View className="h-[188px] mb-5">
            <StepHeader />

            <View className="px-4">
              <Stepper />

              <View className="mt-[20px] w-full flex-row justify-between items-center">
                <CustomChip label={"Sobre ti"} status="active" />
                <CustomChip label={"Tu foto"} status="inactive" />
              </View>
            </View>
          </View>

          {/* Step Titles */}
          <View className="h-auto">
            <Text className="text-primarios-violeta-100 text-h font-roboto-regular mb-[5px]">
              Paso 1
            </Text>
            <Text
              className="text-[#7166D2] text-[16px] font-roboto-medium"
              style={{ opacity: 0.8 }}
            >
              Cuéntanos un poco más sobre vos
            </Text>
          </View>

          <RegisterStep1Form />
        </View>

        {/* Button Set */}
        <View className="flex-row items-center justify-between mt-12">
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
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
      </View>
    </SafeAreaView>
  );
}
