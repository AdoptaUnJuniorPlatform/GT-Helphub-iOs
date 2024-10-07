import { Text, View, SafeAreaView, Button } from "react-native";

export default function RegisterStep4({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Register: Step 4</Text>
        <Button
          title="Atrás"
          onPress={() => navigation.navigate("RegisterStep3")}
        />
        <Button
          title="Siguiente"
          onPress={() => navigation.navigate("RegisterStep5")}
        />
      </View>
    </SafeAreaView>
  );
}
