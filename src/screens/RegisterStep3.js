import { Text, View, SafeAreaView, Button } from "react-native";

export default function RegisterStep3({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Register: Step 3</Text>
        <Button
          title="Atrás"
          onPress={() => navigation.navigate("RegisterStep2")}
        />
        <Button
          title="Siguiente"
          onPress={() => navigation.navigate("RegisterStep4")}
        />
      </View>
    </SafeAreaView>
  );
}
