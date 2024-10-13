import { useState } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import CustomTextarea from "../components/CustomTextarea";
import StepTitle from "../components/StepTitle";

export default function RegisterStep4_1({ navigation }) {
  const [title, setTitle] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white px-4">
        <StepHeader
          step={"4"}
          label1={"Mis habilidades"}
          label2={"Que quiero aprender"}
          status1={"active"}
          status2={"inactive"}
        />

        <StepTitle title={"Paso 4"} subtitle={"¡Ya casi terminamos!"} />

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
            onPress={() => navigation.navigate("RegisterStep4_2")}
            variant="white"
            width="content"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
