import { Text, View, SafeAreaView, Button } from "react-native";

export default function RegisterStep5({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Register: Step 5</Text>
        <Button
          title="Atrás"
          onPress={() => navigation.navigate("RegisterStep4")}
        />
        <Button
          title="Siguiente"
          onPress={() => navigation.navigate("SessionStart")}
        />
      </View>
    </SafeAreaView>
  );
}
