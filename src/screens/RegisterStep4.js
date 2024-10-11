import { useState } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import StepHeader from "../components/StepHeader";
import CustomChip from "../components/CustomChip";
import Stepper from "../components/Stepper";
import CustomTextarea from "../components/CustomTextarea";

export default function RegisterStep1({ navigation }) {
  const [title, setTitle] = useState("");

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white px-4">
        <View className="mb-5">
          <StepHeader
            title="¡Ya casi terminamos!"
            subtitle="Carga tu primera habilidad"
            full
          />

          <View className="px-4">
            <Stepper step="4" />

            <View className="mt-[20px] w-full flex-row justify-between items-center">
              <CustomChip label={"Mis habilidades"} status="active" />
              <CustomChip label={"Que quiero aprender"} status="inactive" />
            </View>
          </View>
        </View>

        <View className="bg-[#fafafa] w-full flex-grow px-[30px] py-[17px] mt-4 mb-7">
          <Text className="text-neutros-negro text-[24px] font-roboto-regular">
            Mis habilidades
          </Text>
          <View className="border-t-[1px] border-neutros-negro mt-[8px] mb-[6px]"></View>
          <Text className="text-neutros-negro text-[16px] font-roboto-regular">
            Aún no tiene habilidades cargadas.
          </Text>
          <Text className="text-neutros-negro text-[16px] font-roboto-regular">
            Carga tu primera habilidad para continuar.
          </Text>
        </View>

        <Text className="text-primarios-violeta-100 text-h font-roboto-regular mb-[20px]">
          Paso 4
        </Text>

        <View className="flex-1">
          <Text className="text-neutral-color-gray-900 font-roboto-medium text-[20px] mb-[8px]">
            Nueva Habilidad
          </Text>
          <Text className="text-neutral-color-blue-gray-500 font-poppins-medium text-[16px]">
            ¡Puedes cargar múltiples habilidades y siempre puedes cambiarlas o
            editarlas más tarde!
          </Text>
        </View>

        <View>
          <Text>Escribe el título de tu publicación</Text>
          <CustomTextarea
            value={title}
            onChange={setTitle}
            placeholder="Ej: Pintar óleo"
            numberOfLines="1"
          />
        </View>

        <View className="flex-row items-center justify-between mt-12">
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
            width="content"
            isBackButton
          />
          <CustomButton
            title="Siguiente"
            onPress={() => navigation.navigate("RegisterStep5")}
            variant="white"
            width="content"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
