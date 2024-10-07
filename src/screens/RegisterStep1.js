import {
  Text,
  View,
  SafeAreaView,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LogoDark from "../components/LogoDark";
import RegisterStep1Form from "../components/RegisterStep1Form";
import Feather from "@expo/vector-icons/Feather";

export default function RegisterStep1({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white px-4">
        <View className="flex-1 justify-center items-center">
          <View className="flex-1 w-full items-center py-8 border-b-[1px] border-b-neutral-color-blue-gray-100">
            <View>
              <LogoDark />
            </View>
            <View className="mt-[34px] w-[257px]">
              <Text className="font-roboto-light leading-10 text-[30px] text-center text-neutros-negro">
                Cuéntanos un poco más sobre ti
              </Text>
            </View>
          </View>
          <View className="flex-row items-center p-4 pb-7">
            <View className="flex-1 justify-center items-center gap-4">
              <View className="h-[31px] w-[31px] bg-neutros-negro-80 rounded-full items-center justify-center">
                <Text className="text-white font-roboto-regular text-[16px]">
                  1
                </Text>
              </View>
              <Text className="text-[14px] text-neutros-negro">Sobre ti</Text>
            </View>
            <View className="flex-1 justify-center items-center gap-4">
              <View className="h-[31px] w-[31px] bg-primarios-celeste-100 rounded-full items-center justify-center">
                <Text className="text-white font-roboto-regular text-[16px]">
                  2
                </Text>
              </View>
              <Text className="text-[14px] text-neutros-negro">Tu foto</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="text-primarios-violeta-100 text-h font-roboto-regular">
            Paso 1
          </Text>
        </View>

        <RegisterStep1Form />

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          className="flex-row items-center gap-[8px] mt-12"
        >
          <Feather name="chevron-left" size={20} color="#212121" />
          <Text className="uppercase font-roboto-bold text-[12px] text-[#263238]">
            Atrás
          </Text>
        </TouchableOpacity>

        <Button
          title="Siguiente"
          onPress={() => navigation.navigate("RegisterStep2")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
