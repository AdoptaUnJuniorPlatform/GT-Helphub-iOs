import { View, SafeAreaView } from "react-native";
import RegisterStep1Form from "../components/forms/RegisterStep1Form";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import StepTitle from "../components/StepTitle";

export default function RegisterStep1({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-4">
        <View className="flex-1">
          <StepHeader
            step="1"
            label1={"Sobre ti"}
            label2={"Tu foto"}
            status1={"active"}
            status2={"inactive"}
          />
          <StepTitle
            title="Paso 1"
            subtitle="Cuéntanos un poco más sobre vos"
          />
          <RegisterStep1Form />
        </View>

        {/* Navigation Button Set */}
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
